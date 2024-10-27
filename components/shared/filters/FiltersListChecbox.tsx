'use client';

import React from 'react';
import {Input} from "@/components/ui/input";
import {FilterChecboxProps, FilterCheckbox} from "@/components/shared/filters/FilterChecbox";
import {Skeleton} from "@/components/ui/skeleton";



type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    selected?: Set<string>;
    className?: string;
    name?: string;
}

export const FiltersListCheckbox: React.FC<Props> = ({
                                                          title,
                                                          items,
                                                          defaultItems,
                                                          limit = 5,
                                                          searchInputPlaceholder = 'Поиск...',
                                                          className,
                                                          loading,
                                                          onClickCheckbox,
                                                          selected,
                                                          name,
                                                      }) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-3">{title}</p>

                <Skeleton count={limit} className="h-6 mb-4 dark:bg-primary rounded-[8px]" />

                <Skeleton count={1} className="w-28 h-6 mb-4 dark:bg-primary rounded-[8px]" />
            </div>
        );
    }

    const list = showAll
        ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()))
        : (defaultItems || items)?.slice(0, limit);

    return (
        <div className={className}>
            <p className="font-bold text-lg mb-3">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input
                        onChange={onChangeSearchInput}
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border dark:border-primary/60 bg-transparent focus-visible:border-primary"
                    />
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list?.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selected?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        name={name}
                    />
                ))}
            </div>

            {items?.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};