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
  Select,
} from "@chakra-ui/react";

import axios from 'axios';

const ApiRequest = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [responseTime, setResponseTime] = useState(null);
  const [selectedValue, setSelectedValue] = useState('fetch');
  const [ajaxResponseTime, setAjaxResponseTime] = useState(null);

  const getRequest = async () => {
    const startTime = performance.now();

    if (selectedValue === "fetch") {
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
    } else if (selectedValue === "axios") {
      try {
        const response = await axios.get(apiUrl);

        if (!response.data) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error);
        setResponseTime(null);
        return;
      }
    } else if (selectedValue === "ajax") {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", apiUrl, true);

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          const endTime = performance.now();
          const elapsedTime = endTime - startTime;
          setAjaxResponseTime(elapsedTime);
        } else {
          console.error('Request failed with status:', xhr.status);
          setAjaxResponseTime(null);
        }
      };

      xhr.onerror = function () {
        console.error('Request failed');
        setAjaxResponseTime(null);
      };

      xhr.send();
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
      <Select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
        <option value="fetch">Check the response using fetch</option>
        <option value="axios">Check the response using axios</option>
        <option value="ajax">Check the response using AJAX</option>
      </Select>
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
          _hover={{ bg: "teal.600", color: "white" }}
        >
          Get Response Time
        </Button>
      </form>
      {responseTime !== null && (
        <Box mt="4" p="4" rounded="lg" boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" color="teal.600">
            API Response Time:{selectedValue ? ` fetched from ${selectedValue}` : " something went wrong"}
          </Text>
          <Text fontSize="xl" color={getBadgeColor(responseTime)} fontWeight="semibold" mt="2">
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
      {ajaxResponseTime !== null && (
        <Box mt="4" p="4" rounded="lg" boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" color="teal.600">
            AJAX Response Time
          </Text>
          <Text fontSize="xl" color={getBadgeColor(ajaxResponseTime)} fontWeight="semibold" mt="2">
            {ajaxResponseTime.toFixed(2)} milliseconds
          </Text>
          <Badge
            colorScheme={getBadgeColor(ajaxResponseTime)}
            mt="2"
            variant="subtle"
          >
            {getBadgeLabel(ajaxResponseTime)}
          </Badge>
        </Box>
      )}
    </Container>
  );
};

export default ApiRequest;
