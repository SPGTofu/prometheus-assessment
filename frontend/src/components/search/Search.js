import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    const searchval = search.toUpperCase().trim();
    if (searchval !== '') {
      navigate(`/${searchval}`);
    }
  }

  return (
    <Flex flexDirection='row' mr={4} p={1}>
      <Button
        size='xl'
        backgroundColor='blue'
        color='white'
        onClick={handleSearch}
      >
        Search
      </Button>
      <Input
        size='xl'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Flex>
  )
}