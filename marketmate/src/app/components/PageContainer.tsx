import React from "react"
import Navbar from "./Navbar"
import { Box } from '@chakra-ui/react'

interface PageContainerProps {
    children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({children}) => {
    return (
        <Box height='100vh'>
            <Navbar/>
            <Box padding='2rem'>
                {children}
            </Box>
        </Box>
    )
}

export default PageContainer