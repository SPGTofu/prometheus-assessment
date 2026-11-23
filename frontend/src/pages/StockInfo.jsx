import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import StockChart from '../components/stock_chart/StockChart';

export default function StockInfo() {
  const { symbol = '' } = useParams();
  const stockSymbol = decodeURIComponent(symbol).toUpperCase();
  const [error, setError] = useState('');
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError('');
    setStockData(null);
    setLoading(true);
    const controller = new AbortController();

    fetch(`/api/stocks/${encodeURIComponent(symbol)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not load stock data');
        return result;
      })
      .then((data) => {
        if (controller.signal.aborted) return;
        if (!Array.isArray(data)) throw new Error('The stock API returned an invalid response');
        setStockData(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [symbol]);

  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Text>Loading stock data...</Text>
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center" color="red.500" flexDirection="column">
        <Heading>
          Error Loading Data for {stockSymbol || 'Stock'}
        </Heading>
        <Text>{error}</Text>
      </Flex> 
    )
  }

  return (
    <Container maxW="6xl" py={{ base: 8, md: 12 }}>
      <VStack align="stretch" gap={6}>
        <Box>
          <Text mb={2} color="gray.500" fontSize="sm" fontWeight="semibold" letterSpacing="wide">
            STOCK OVERVIEW
          </Text>
          <Heading as="h1" size={{ base: '2xl', md: '3xl' }}>
            {stockSymbol || 'Stock'}
          </Heading>
        </Box>

        <Box
          as="section"
          aria-label={`${stockSymbol || 'Stock'} graph`}
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="xl"
          boxShadow="sm"
          p={{ base: 4, md: 6 }}
        >
          <StockChart stockData={stockData} />
        </Box>
      </VStack>
    </Container>
  );
}
