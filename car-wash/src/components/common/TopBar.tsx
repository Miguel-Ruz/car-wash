import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

type Props = {
    title: string
}

const TopBar = ({title}: Props) => {
    return (
        <Box
            as="header"
            paddingTop="16px"
            paddingBottom="16px"
            paddingRight="24px"
            paddingLeft="24px"
            borderBottom="1px solid #E2E8F0"
        >
            <Heading size="md" color="fontColor" fontWeight="semibold">
                {title}
            </Heading>
        </Box>
    )
}

export default TopBar