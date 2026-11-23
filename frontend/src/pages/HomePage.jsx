import { Flex, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Flex
      height ='100vh'
      alignItems='center'
      justifyContent='center'
    >
      <Text w={600} fontSize='2xl' textAlign='center' >
        Welcome! Start by searching for a stock symbol in the search bar above.
      </Text>
    </Flex>
  )
}