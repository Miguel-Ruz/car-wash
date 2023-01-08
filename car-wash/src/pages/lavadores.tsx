import { Box, Button, Flex, HStack, IconButton, Input, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import React from 'react'
import { FiCalendar, FiPlus, FiSearch } from 'react-icons/fi'
import { DashboardLayout } from '../components'
import TopBar from '../components/common/TopBar'

type Props = {}

const lavadores = (props: Props) => {
  const thWidth = "18vw"
  return (
    <DashboardLayout>
      <>

        <TopBar title='Lavadores' />

        <HStack
          p="32px 24px"
          display="flex"
          justifyContent="space-between"
        >
          <HStack spacing="16px">
            <Text color="fontNavColor">
              Buscar
            </Text>
            <Input
              placeholder='Documento'
              w="206px"
              h="36px"
              fontWeight="14px"
              focusBorderColor='buttonColor'
            />
            <Input
              placeholder='Nombre'
              w="206px"
              h="36px"
              fontWeight="14px"
              focusBorderColor='buttonColor'
            />
            <IconButton
              aria-label='busqueda'
              icon={<FiSearch />}
              variant="outline"
              color="buttonColor"
              h="36px"
            />
          </HStack>
          <Box>
            <Button
              w="208px"
              h="32px"
              leftIcon={<FiPlus />}
              bg="buttonColor"
              color="mainColor"
              fontSize="14px"
              p="18px 12px"
              fontWeight="semibold"
              _hover={{ bg: "#258685" }}
            >
              Registrar nuevo lavador
            </Button>
          </Box>
        </HStack>

        <Box px="24px">
          <TableContainer
            border="1px solid #E2E8F0"
            borderRadius="12px"
          >
            <Table size="md">
              <Thead>
                <Tr bg="primaryColor">
                  <Th w={thWidth} >Nombre</Th>
                  <Th w={thWidth} textAlign="center" isNumeric>Documentos</Th>
                  <Th w={thWidth} isNumeric>Lavados del dia</Th>
                  <Th w={thWidth} isNumeric>Ganancia</Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                <Tr >
                  <Td >Eibel Tres Palacios</Td>
                  <Td isNumeric>000555999</Td>
                  <Td  isNumeric>3</Td>
                  <Td isNumeric>$25.000</Td>
                  <Td >
                    <Tooltip
                      hasArrow
                      label="Cerrar día"
                      placement='auto'
                    >
                      <Stack align="end">
                        <FiCalendar
                          cursor="pointer"
                          color='#319795'
                        /> {/* ALINEAR A LA DERECHA ESTE BENDITO ICONITO. ME HIZO BOTAR EL CHUPO */}
                      </Stack>
                    </Tooltip>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </>
    </DashboardLayout>
  )
}

export default lavadores