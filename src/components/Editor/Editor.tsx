import React, {
    FormEvent,
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import cn from 'classnames/bind';
import debounce from 'lodash/debounce';
import { Link, useLocation, useParams } from 'react-router-dom';

import { getFileContent } from 'src/dataProvider/repos/contents';
import { pushFileContent } from 'src/dataProvider/repos/push';

import { EditorProps } from './Editor.types';

import * as styles from './Editor.pcss';
import ReactMarkdown from 'react-markdown';
import set = Reflect.set;
import { github } from 'src/utils/githubDomains';
import { Navigation } from 'src/components/Navigation';

const cx = cn.bind(styles);

export const Editor: FunctionComponent<EditorProps> = props => {
    const { state } = props;
    const { user, repo } = useParams();
    const { pathname } = useLocation();

    const [isPreview, setIsPreview] = useState(false);
    
    const token = 'TESTTOKENTESTTOKENTESTTOKENTESTTOKEN'
   
    const filePath =
        pathname
            .slice(1)
            .split('/')
            .slice(3)
            .join('/') || 'README.md';

    const [content, onContent] = useState('');

    useEffect(() => {
        const onKeyPress = (event: KeyboardEvent) => {
            const isSaveCombination = event.metaKey && event.code === 'KeyS';
            const isExitCombination = event.metaKey && event.code === 'KeyD';

            if (isSaveCombination || isExitCombination) {
                event.preventDefault();
                event.stopPropagation();
            }

            if (isExitCombination) {
                window.open(`#${user}/${repo}/${filePath}`, '_self');
            }

            if (isSaveCombination && !event.shiftKey) {
                setIsPreview(!isPreview);
            }

            if (isSaveCombination && event.shiftKey) {
                navigator.clipboard.writeText(content).then(() => {
                    window.open(
                        `${github(
                            state
                        )}/${user}/${repo}/edit/master/${filePath}`,
                        '_blank'
                    );
                });
            }
        };

        window.addEventListener('keydown', onKeyPress);

        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [isPreview, content]);

    useEffect(() => {
        onContent('');

        getFileContent({
            user,
            repo,
            state,
            filePath,
            onSuccess: onContent,
            onError: () => onContent(`File ${filePath} doesn't exist`),
        });
    }, [filePath]);

    const delayedContentUpdate = debounce((value: string) => {
        onContent(value);
    }, 500);

    const onButtonClick = useCallback(() => {
        setIsPreview(!isPreview);
    }, [isPreview]);

    const onTextAreaInput = useCallback(
        (event: FormEvent<HTMLTextAreaElement>) => {
            delayedContentUpdate(event.currentTarget.value);
        },
        []
    );

    const onMouseEnter = useCallback(() => {
        navigator.clipboard.writeText(content);
    }, [content]);

    const onLinkClick = useCallback(() => {
        navigator.clipboard.writeText(content).then(() => {
            pushFileContent({
                user,
                repo,
                state,
                content,
                token,
                filePath,
                onSuccess: () => console.log('Done'),
                onError: () => console.log('Error')
            })
            window.open(`#${user}/${repo}/${filePath}`, '_self');
        });
    }, [content]);
    return (
        <>
            <Navigation user={user} repo={repo} state={state} />
            <div className={cx('root', isPreview && 'root_preview')}>
                <div className={cx('menu')}>
                    <span>
                        Edititng: {filePath.replace('.md', '').replace('/', ' / ')}
                    </span>
                    <Link to={`/${user}/${repo}/${filePath}`} className={cx('close-button')}>
                        ×
                    </Link>
                </div>

                {content && !isPreview && (
                    <textarea
                        onInput={onTextAreaInput}
                        className={cx('textarea')}
                        defaultValue={content}
                    />
                )}
                {isPreview && (
                    <div className={cx('content')}>
                        <ReactMarkdown linkTarget="_blank" escapeHtml={false}>
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
                <div className={cx('down-menu')}>
                    <button onClick={onButtonClick} className={cx('preview')}>
                        {isPreview ? 'Edit' : 'Preview'}
                    </button>
                    <Link
                        to={`/${user}/${repo}/${filePath}`}
                        onMouseEnter={onMouseEnter}
                        onClick={onLinkClick}
                        className={cx('edit-link')}
                    >
                        Save changes
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Editor;
