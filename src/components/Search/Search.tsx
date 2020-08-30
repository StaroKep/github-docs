import React, {
    FunctionComponent,
    useCallback,
    useState,
    FormEvent,
    useEffect,
} from 'react';
import debounce from 'lodash/debounce';
import cn from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import { findInFiles } from 'src/services/cache';

import { onSearchCodeSuccess } from './helpers';
import { SearchProps } from './Search.types';

import * as styles from './Search.pcss';

const cx = cn.bind(styles);

export const Search: FunctionComponent<SearchProps> = props => {
    const { state, children } = props;
    const { user, repo } = useParams();

    const [loading, onLoading] = useState(false);
    const [results, onResults] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                setIsVisible(false);
            }
        });
    }, []);

    const delayedSearchCode = debounce(value => {
        onLoading(true);
        onResults([]);
        onLoading(false);
        findInFiles({
            user,
            repo,
            state,
            text: value,
            callback: data => {
                onLoading(false);
                console.log(data);
                onSearchCodeSuccess(data, onResults);
            },
        });
    }, 500);

    const onInput = useCallback((event: FormEvent<HTMLInputElement>) => {
        delayedSearchCode(event.currentTarget.value);
    }, []);

    let resultsText = '';
    if (loading) {
        resultsText = 'Loading...';
    } else if (!results.length) {
        resultsText = 'No searching results...';
    }

    const onSearchInputClick = useCallback(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={cx('root', isVisible && 'root_visible')}>
            <div
                className={cx('search-form', isVisible && 'search-form_inside')}
            >
                <FaSearch className={cx('search-icon')} />
                <input
                    className={cx('search-input')}
                    onInput={onInput}
                    onClick={onSearchInputClick}
                    type="text"
                    placeholder="Enter search request"
                />
            </div>
            <div className={cx('results')}>
                <h3 className={cx('results-title')}>RESULTS</h3>
                {results.map(result => (
                    <a
                        className={cx('result')}
                        key={result}
                        href={`#${user}/${repo}/${result}`}
                        title={result}
                    >
                        {result.replace('.md', '')}
                    </a>
                ))}
                {resultsText}
                {children}
            </div>
        </div>
    );
};

export default Search;
