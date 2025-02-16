import Icon from '@components/atoms/Icon'
import React from 'react'

interface TabIconProps {
    focused: boolean,
    color: string,
    size: number
}
export const HomeIcon:React.FC<TabIconProps>=({focused, color, size}) => {
    return(
        <Icon
            name={focused ? 'home':'home-outline'}
            size={size}
            iconFamily='Ionicons'
            color={color}
        />
    )
}
export const CategoryIcon:React.FC<TabIconProps>=({focused, color, size}) => {
    return(
        <Icon
            name={focused ? 'grid':'grid-outline'}
            size={size}
            iconFamily='Ionicons'
            color={color}
        />
    )
}
export const AccountIcon:React.FC<TabIconProps>=({focused, color, size}) => {
    return(
        <Icon
            name={focused ? 'person':'person-outline'}
            size={size}
            iconFamily='Ionicons'
            color={color}
        />
    )
}
export const CartIcon:React.FC<TabIconProps>=({focused, color, size}) => {
    return(
        <Icon
            name={focused ? 'cart':'cart-outline'}
            size={size}
            iconFamily='MaterialCommunityIcons'
            color={color}
        />
    )
}
