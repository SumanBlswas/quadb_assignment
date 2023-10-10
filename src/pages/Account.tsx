import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  password: string;
}

const Account = ({ setIsLoggedIn }: { setIsLoggedIn: CallableFunction }) => {
  const [user, setUser] = useState<User | null>(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const {
    isOpen: isPasswordModalOpen,
    onOpen: openPasswordModal,
    onClose: closePasswordModal,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  useEffect(() => {
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      setUser(JSON.parse(currentUserData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleChangePassword = () => {
    if (!password || !newPassword || !confirmNewPassword) {
      toast({
        title: "Fields Empty!",
        description: "Please fill in all password fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Password Mismatch!",
        description: "New passwords do not match.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (user) {
      user.password = newPassword;
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast({
        title: "Password Changed Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closePasswordModal();
    }
  };

  const handleDeleteAccount = () => {
    setIsLoggedIn(false);
    openDeleteModal();
  };

  const confirmDeleteAccount = () => {
    localStorage.removeItem("currentUser");
    const storedUsers: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    if (user) {
      const updatedUsers = storedUsers.filter((u) => u.email !== user.email);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    toast({
      title: "Account Deleted!",
      description: "Your account has been deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"} mt={5}>
        <Box
          width="350px"
          p={6}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="lg"
          bg={"#fff"}
        >
          <Heading size="lg" mb={6}>
            Account Details
          </Heading>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={user?.name || ""} isReadOnly />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={user?.email || ""} isReadOnly />
          </FormControl>
          <Button
            colorScheme={"pink"}
            size="lg"
            onClick={openPasswordModal}
            width="100%"
            mb={4}
          >
            Change Password
          </Button>
          <Button
            colorScheme={"red"}
            size="lg"
            onClick={handleDeleteAccount}
            width="100%"
          >
            Delete Account
          </Button>
          <Button
            colorScheme={"purple"}
            size="lg"
            onClick={handleLogout}
            width="100%"
            mt={4}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Modal isOpen={isPasswordModalOpen} onClose={closePasswordModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Current Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="pink" onClick={handleChangePassword}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={confirmDeleteAccount}>
              Delete
            </Button>
            <Button colorScheme="gray" onClick={closeDeleteModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Account;
