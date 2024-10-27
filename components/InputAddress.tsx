'use client';

import React, {useId} from 'react';
import {AddressSuggestions, DaDataAddress, DaDataSuggestion} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import {InputCustom} from "@/components/shared/InputCustom";

interface Props {
    onChange?: (value?: string) => void;
    value?:DaDataSuggestion<DaDataAddress>;
}

export const InputAddress: React.FC<Props> = ({ onChange,value }) => {
    const id = useId();
    return (
        <>
            <label htmlFor="">Адрес доставки</label>
            <AddressSuggestions  value={value} customInput={InputCustom} highlightClassName={'text-primary'}
                                suggestionsClassName={'absolute left-0 top-full z-50 w-full  bg-dark-background/70 backdrop-blur-md border border-primary rounded-md mt-1'}
                                token="b5b8bb983ddcd08648080e0271d9dd367bb7aa65" uid={id}
                                onChange={(data) => onChange?.(data?.value)}
            />
        </>
    );
};