import { IItem } from './index';
import { KeyboardEvent, useRef, useState } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const sortedElements = props.initialData.sort((a, b) =>
        props.sorting === 'ASC' ? a.id - b.id : b.id - a.id,
    );

    const keyItems = sortedElements.map((item) => (
        <KeyItem key={item.id} item={item} />
    ));

    return <div>{keyItems}</div>;
}

export function KeyItem(props: { item: IItem }) {
    const [name, setName] = useState(props.item.name);
    const input = useRef<HTMLInputElement>(null);
    const [isActiveInput, setIsActiveInput] = useState(false);

    function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        switch (e.key) {
            case 'Enter': {
                setName(input.current?.value ?? '');
                setIsActiveInput(false);
                break;
            }
            case 'Escape': {
                setIsActiveInput(false);
                break;
            }
        }
    }

    function onClick() {
        setIsActiveInput(true);
    }

    return isActiveInput ? (
        <input ref={input} onKeyDown={onKeyDown} defaultValue={name} />
    ) : (
        <div onClick={onClick}>{name}</div>
    );
}
