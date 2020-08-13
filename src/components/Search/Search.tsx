import React, {
    FunctionComponent,
    useCallback,
    useState,
    FormEvent,
} from 'react';
import debounce from 'lodash/debounce';
import cn from 'classnames/bind';

import { searchCode } from 'src/dataProvider/search/code';

import { onSearchCodeSuccess } from './helpers';
import { SearchProps } from './Search.types';

import * as styles from './Search.pcss';
import { useParams } from 'react-router-dom';

const cx = cn.bind(styles);

export const Search: FunctionComponent<SearchProps> = props => {
    const { state } = props;
    const { user, repo } = useParams();

    const [loading, onLoading] = useState(false);
    const [results, onResults] = useState<string[]>([]);

    const delayedSearchCode = debounce(
        value =>
        {
            onLoading(true);
            onResults([]);
            searchCode({
                user,
                repo,
                state,
                request: value,
                onSuccess: data => {
                    onLoading(false);
                    onSearchCodeSuccess(data, onResults);
                },
            })
        },
        500
    );

    const onInput = useCallback((event: FormEvent<HTMLInputElement>) => {
        delayedSearchCode(event.currentTarget.value);
    }, []);

    let resultsText = '';
    if (loading) {
        resultsText = 'Loading...';
    } else if (!results.length) {
        resultsText = 'No searching results...';
    }

    return (
        <div className={cx('root')}>
            <div className={cx('search-form')}>
                <input
                    className={cx('search-input')}
                    onInput={onInput}
                    type="text"
                    placeholder="Search phrase..."
                />
            </div>
            <div className={cx('results')}>
                {results.map(result => (
                    <a
                        className={cx('result')}
                        key={result}
                        href={`#${user}/${repo}/${result}`}
                    >
                        {result.replace('.md', '')}
                    </a>
                ))}
                {resultsText}
            </div>
        </div>
    );
};

export default Search;
