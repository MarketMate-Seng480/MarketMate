import React, { useState } from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    MenuGroup,
    MenuOptionGroup,
    MenuItemOption,
    MenuButtonProps,
} from "@chakra-ui/menu";

/// MultiSelectMenu component
// Adapted From: https://codesandbox.io/p/sandbox/chakra-custom-multi-select-0n0cu?file=/src/multiselect-menu.tsx
const MultiSelectMenu = (props: MultiSelectMenuProps): JSX.Element => {
    const { label, options, buttonProps } = props;
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleChange = (values: string | string[]) => {
        if (Array.isArray(values)) {
            // Limit selection to a maximum of 3 options
            setSelectedOptions(values.slice(0, 3));
            props.onChange?.(values.slice(0, 3));
        } else {
            setSelectedOptions([values]);
            props.onChange?.([values]);
        }
    };

    const handleClear = () => {
        setSelectedOptions([]);
    };

    return (
        <Menu closeOnSelect={false}>
            {({ onClose }) => (
                <>
                    <MenuButton
                        type="button"
                        background={"white"}
                        color={"gray.200"}
                        borderColor={"gray.300"}
                        borderWidth={1}
                        p={2}
                        px={5}
                        borderRadius="10px"
                        _focus={{
                            outline: "none",
                        }}
                        {...buttonProps}
                    >
                        {selectedOptions.length
                            ? selectedOptions.join(", ") + ` (${selectedOptions.length})`
                            : label}
                    </MenuButton>
                    <MenuList background={"white"}>
                        <MenuGroup title={undefined}>
                            <MenuItem
                                _focus={{ bg: "white" }}
                                _hover={{ bg: "gray.500" }}
                                _active={{ bg: "gray.500" }}
                                onClick={handleClear}
                            >
                                Clear all
                            </MenuItem>
                        </MenuGroup>

                        <MenuDivider />

                        <MenuOptionGroup
                            title={"Select up to 3 Tags"}
                            value={selectedOptions}
                            type="checkbox"
                            onChange={handleChange}
                        >
                            {options.map((option) => {
                                return (
                                    <MenuItemOption
                                        key={`multiselect-menu-${option}`}
                                        type="checkbox"
                                        value={option}
                                        _focus={{ bg: "white" }}
                                        _hover={{ bg: "gray.500" }}
                                        _active={{ bg: "gray.500" }}
                                        isDisabled={
                                            selectedOptions.length >= 3 &&
                                            !selectedOptions.includes(option)
                                        }
                                    >
                                        {option}
                                    </MenuItemOption>
                                );
                            })}
                        </MenuOptionGroup>
                    </MenuList>
                </>
            )}
        </Menu>
    );
};

MultiSelectMenu.displayName = "MultiSelectMenu";

export type MultiSelectMenuProps = {
    label: string;
    options: string[];
    onChange?: (selectedValues: string[]) => void;
    buttonProps?: MenuButtonProps;
};

export default MultiSelectMenu;
