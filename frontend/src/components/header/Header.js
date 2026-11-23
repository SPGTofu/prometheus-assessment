import { Button, Flex } from "@chakra-ui/react";
import { useNavigate, Outlet } from "react-router-dom";
import Search from "../search/Search";

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <Flex w='100%' bg='gray.100' justifyContent='space-between'>
        <Button
          variant='ghost'
          size='xl'
          onClick={() => navigate('/')}
          ml={4}
        >
          Home
        </Button>
        <Search />
      </Flex>
      <Outlet />
    </>
  )
}