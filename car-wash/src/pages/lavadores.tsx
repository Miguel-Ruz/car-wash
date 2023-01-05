import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { DashboardLayout } from '../components'
import TopBar from '../components/common/TopBar'

type Props = {}

const lavadores = (props: Props) => {
  return (
    <DashboardLayout>
      <TopBar title='Lavadores'/>
    </DashboardLayout>
  )
}

export default lavadores