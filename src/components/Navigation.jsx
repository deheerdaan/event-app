import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { createEvent } from "../api/eventApi";
import { useData } from "../context/DataContext";
import { CreateEventModal } from "./event/CreateEventModal";
import { SearchBar } from "./ui/SearchBar";

export const Navigation = ({ searchQuery, onSearchChange }) => {
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { invalidateEvents, invalidateCategories, invalidateUsers } = useData();

  const handleCreateEvent = async (eventData) => {
    try {
      await createEvent(eventData);
      setIsCreateModalOpen(false);
      invalidateCategories();
      invalidateUsers();
      invalidateEvents();

      setTimeout(() => {
        toast.success("Event created successfully!");
      }, 100);
    } catch (error) {
      toast.error("Failed to create event. Please try again.");
    }
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const NavItem = ({ to, children, icon, badge }) => (
    <Link
      as={RouterLink}
      to={to}
      px={4}
      py={2}
      rounded="lg"
      display="flex"
      alignItems="center"
      gap={2}
      color={isActive(to) ? "gray.700" : "gray.600"}
      bg={isActive(to) ? "gray.100" : "transparent"}
      fontWeight={isActive(to) ? "semibold" : "medium"}
      _hover={{
        bg: isActive(to) ? "gray.200" : "gray.50",
        textDecoration: "none",
        transform: "translateY(-1px)",
      }}
      transition="all 0.2s"
      position="relative"
    >
      {icon && <Icon as={icon} boxSize={4} />}
      {children}
      {badge && (
        <Badge
          colorScheme="red"
          borderRadius="full"
          px={2}
          py={0.5}
          fontSize="xs"
          ml={1}
        >
          {badge}
        </Badge>
      )}
    </Link>
  );

  return (
    <>
      <Box
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        position="sticky"
        top={0}
        zIndex={1000}
        boxShadow="sm"
        px={{ base: 4, md: 6 }}
      >
        <Flex
          minH={{ base: 14, md: 16 }}
          alignItems="center"
          justifyContent="space-between"
          py={{ base: 2, md: 4 }}
          flexWrap="wrap"
          gap={{ base: 2, md: 4 }}
        >
          {location.pathname === "/" && (
            <Heading
              size={{ base: "md", md: "lg" }}
              color="gray.800"
              fontWeight="bold"
              order={{ base: 1, md: 1 }}
              flex="0 0 auto"
            >
              Events
            </Heading>
          )}

          <Flex
            gap={{ base: 2, md: 4 }}
            flexWrap="wrap"
            align="center"
            justify="flex-end"
            flex="1"
            order={{ base: 2, md: 2 }}
          >
            {location.pathname === "/" && (
              <SearchBar
                value={searchQuery || ""}
                onChange={onSearchChange}
                size="sm"
                width="200px"
              />
            )}

            {location.pathname.startsWith("/event/") && (
              <NavItem to="/" icon={FaHome}>
                All Events
              </NavItem>
            )}

            {location.pathname === "/" && (
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                colorScheme="gray"
                bg="gray.700"
                color="white"
                size={{ base: "sm", md: "sm" }}
                leftIcon={<FaPlus />}
                _hover={{
                  bg: "gray.800",
                  transform: "translateY(-1px)",
                  boxShadow: "md",
                }}
                transition="all 0.2s"
                fontSize={{ base: "xs", md: "sm" }}
                px={{ base: 3, md: 4 }}
              >
                <Box display={{ base: "none", sm: "block" }}>Create Event</Box>
                <Box display={{ base: "block", sm: "none" }}>Create</Box>
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateEvent}
      />
    </>
  );
};
