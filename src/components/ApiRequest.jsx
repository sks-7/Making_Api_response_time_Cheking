import React, { useState } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Badge,
} from "@chakra-ui/react";

const ApiRequest = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [responseTime, setResponseTime] = useState(null);

  const getRequest = async () => {
    const startTime = performance.now();

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseTime(null);
      return;
    }

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    setResponseTime(elapsedTime);
  };

  
  const badgeLabels = {
    best: { label: "Best", maxTime: 50 }, 
    good: { label: "Good", maxTime: 100 }, 
  };

  const getBadgeColor = (time) => {
    if (time <= badgeLabels.best.maxTime) {
      return "green";
    } else if (time <= badgeLabels.good.maxTime) {
      return "blue";
    } else {
      return "red";
    }
  };

  const getBadgeLabel = (time) => {
    if (time <= badgeLabels.best.maxTime) {
      return badgeLabels.best.label;
    } else if (time <= badgeLabels.good.maxTime) {
      return badgeLabels.good.label;
    } else {
      return "Worst";
    }
  };

  return (
    <Container maxW="lg" centerContent>
      <form onSubmit={(e) => { e.preventDefault(); getRequest(); }}>
        <FormControl id="apiUrl">
          <FormLabel fontSize="lg">Enter API URL</FormLabel>
          <Input
            type="url"
            placeholder="https://example.com/api"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            isRequired
            size="lg"
          />
        </FormControl>
        <Button
          type="submit"
          mt="4"
          colorScheme="teal"
          bg="blue.200"
          
          size="lg"
          variant="solid"
          _hover={{ bg: "teal.600",color:"white"}}
        >
          Get Response Time
        </Button>
      </form>
      {responseTime !== null && (
        <Box mt="4" p="4" rounded="lg" boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" color="teal.600">
            API Response Time:
          </Text>
          <Text fontSize="xl" color={`badge.${getBadgeColor(responseTime)}`} fontWeight="semibold" mt="2">
            {responseTime.toFixed(2)} milliseconds
          </Text>
          <Badge
            colorScheme={getBadgeColor(responseTime)}
            mt="2"
            variant="subtle"
          >
            {getBadgeLabel(responseTime)}
          </Badge>
        </Box>
      )}
    </Container>
  );
};

export default ApiRequest;
