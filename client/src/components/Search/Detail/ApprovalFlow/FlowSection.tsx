import { Box, chakra, Flex, Text } from '@chakra-ui/react';
import { IParticipant, IRequest } from 'api';
import { Fragment } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import { Id } from 'types';
import FlowTag from './FlowTag';

interface FlowSectionProps {
  headline: 'Submitter' | 'Advisors' | 'Approvers' | 'Observators';
  data: IParticipant[];
  currentApprover?: Id[];
  remindApprover?: (userId: string) => void;
  requestStatus?: IRequest['status'];
  noApprover?: boolean;
}

const FlowSection = ({
  headline,
  data,
  currentApprover,
  remindApprover,
  requestStatus,
  noApprover,
}: FlowSectionProps) => {
  return (
    <Fragment>
      {headline === 'Observators' && (
        <>
          <tr>
            <td style={{ height: '1rem' }}></td>
          </tr>
          <chakra.tr borderTop="1px" borderColor="gray.200">
            <td colSpan={2} style={{ height: '1rem' }}></td>
          </chakra.tr>
        </>
      )}
      <tr>
        <chakra.td pos="relative" overflow="visible">
          <Flex justify="center" align="center" p={2}>
            <Flex
              align="center"
              justify="center"
              p={0.5}
              rounded="full"
              pos="relative"
              zIndex={2}
              bg="white"
              color="gray.600"
              border="2px"
              borderColor="gray.600"
            >
              <BsFillCircleFill size="12px" />
            </Flex>
          </Flex>
          <Box
            pos="absolute"
            left="50%"
            top={
              headline === 'Submitter' || headline === 'Observators'
                ? '50%'
                : '-2px'
            }
            w="2px"
            h="140%"
            transform="translate(-50%, 0%)"
            bg="gray.600"
          />
        </chakra.td>
        <chakra.td p={2}>
          <Text fontWeight="semibold">{headline}</Text>
        </chakra.td>
      </tr>
      {data
        .sort((first, second) => first.order - second.order)
        .map((d, idx) => (
          <FlowTag
            key={headline === 'Observators' ? d.email : d.id}
            data={d}
            isCurrent={
              ((headline === 'Approvers' || headline === 'Advisors') &&
                currentApprover?.includes(d.userId)) ||
              (headline === 'Submitter' &&
                requestStatus &&
                requestStatus === 'Revising')
            }
            last={
              (headline === 'Approvers' ||
                headline === 'Observators' ||
                (headline === 'Submitter' && noApprover)) &&
              idx === data.length - 1
            }
            remindApprover={remindApprover}
          />
        ))}
    </Fragment>
  );
};

export default FlowSection;
