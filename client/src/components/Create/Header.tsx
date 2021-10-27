import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { CreateMode } from 'types';

interface HeaderProps {
  mode: CreateMode;
  onSubmitClick: () => void;
  onDraftClick: () => void;
}

const Header = ({ mode, onSubmitClick, onDraftClick }: HeaderProps) => {
  return (
    <Flex justify="space-between" align="center" px={4} py={4} shadow="sm">
      <Heading size="md" color="fill.light" fontWeight="semibold">
        {mode === 'create'
          ? 'Create New Approval Document'
          : mode === 'draft'
          ? 'Edit Draft Document'
          : 'Edit Revising Document'}
      </Heading>
      <Box>
        {mode !== 'revise' && (
          <Button onClick={onDraftClick} variant="ghost">
            Save Draft
          </Button>
        )}
        <Button onClick={onSubmitClick} ml={4}>
          Submit
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
