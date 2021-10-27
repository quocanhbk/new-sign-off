import format from 'date-fns/format';
import { SectionContainer } from 'components/Base';
import InfoLine from './InfoLine';
import { projectList } from 'constant';
import { useRequestContext } from './RequestProvider';
import { chakra, Flex } from '@chakra-ui/react';

const ApprovalInfo = () => {
  const { request: req } = useRequestContext();
  const request = req!;
  const lastApprover = request.approvers[request.approvers.length - 1];
  return (
    <Flex h="full" w="full" justify="center">
      <Flex direction="column" h="full" w="full" maxW="48rem">
        <SectionContainer title="Document">
          <chakra.table sx={{ tableLayout: 'fixed' }} w="full">
            <tbody>
              <InfoLine headline={'Document ID'} content={request.id} />
              <InfoLine headline={'Priority'} content={request.priority} />
              <InfoLine
                headline={'Deadline'}
                content={
                  request.deadline
                    ? format(request.deadline as Date, 'HH:mm dd/MM/yyyy')
                    : ''
                }
              />
              <InfoLine
                headline={'Related project'}
                content={request.relatedProjects
                  .map((i) => projectList.find((p) => p.id === i)!.text)
                  .join(', ')}
              />
              <InfoLine
                headline={'Number of approval file'}
                content={request.approvalAttachments.length}
              />
              {lastApprover && (
                <>
                  <InfoLine
                    headline={'Final approval by'}
                    content={lastApprover.fullname}
                  />
                  <InfoLine
                    headline={'Final approval at'}
                    content={
                      lastApprover.decisionTimestamp
                        ? format(
                            new Date(lastApprover.decisionTimestamp),
                            'HH:mm dd/MM/yyyy'
                          )
                        : 'N/A'
                    }
                  />
                </>
              )}
            </tbody>
          </chakra.table>
        </SectionContainer>
        <SectionContainer title="Creator">
          <chakra.table sx={{ tableLayout: 'fixed' }} w="full">
            <tbody>
              <InfoLine
                headline={'Name'}
                content={request.submitter[0].fullname}
              />
              <InfoLine
                headline={'Email'}
                content={request.submitter[0].email}
              />
              <InfoLine
                headline={'Created'}
                content={format(request.createdAt as Date, 'HH:mm dd/MM/yyyy')}
              />
            </tbody>
          </chakra.table>
        </SectionContainer>
        <SectionContainer title="Log">
          <chakra.table sx={{ tableLayout: 'fixed' }} w="full">
            <tbody>
              {request.logs
                .filter((log) => log.type !== 'Comment')
                .map((log) => (
                  <InfoLine
                    key={log.id}
                    span
                    headline={`${log.author.name} ${
                      log.description
                    } at ${format(
                      new Date(log.createdAt),
                      'HH:mm dd/MM/yyyy'
                    )}`}
                  />
                ))}
            </tbody>
          </chakra.table>
        </SectionContainer>
      </Flex>
    </Flex>
  );
};

export default ApprovalInfo;
