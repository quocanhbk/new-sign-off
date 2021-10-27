import EventComments from './EventComments';
import { projectList } from 'constant';
import {
  AttachmentChecklist,
  DescriptionEditor,
  SectionContainer,
} from 'components/Base';
import { Flex, Text, Wrap } from '@chakra-ui/react';
import { ProjectTag } from 'components/Base/Tags';
import AttachmentTablePC from 'components/Base/AttachmentTablePC';
import ViewAttachmentModal from './ViewAttachmentModal';
import { useRequestContext } from './RequestProvider';

const Content = () => {
  const { request: req, setViewingAttachment } = useRequestContext();
  const request = req!;
  return (
    <Flex h="full" w="full" justify="center">
      <ViewAttachmentModal />
      <Flex direction="column" h="full" w="full" maxW="48rem">
        <SectionContainer title="Related Project">
          <Wrap>
            {request.relatedProjects.map((project) => (
              <ProjectTag
                key={project}
                project={projectList.find((p) => p.id === project)!.text}
              />
            ))}
          </Wrap>
        </SectionContainer>
        <SectionContainer title="Description">
          {request.description ? (
            // <div dangerouslySetInnerHTML={{__html: request.description}}></div> :
            <DescriptionEditor description={request.description} readOnly />
          ) : (
            <Text as="i">No description</Text>
          )}
        </SectionContainer>
        <SectionContainer title="Approval File">
          {request.approvalAttachments.length > 0 ? (
            request.type === 'Procedure' ? (
              <AttachmentChecklist
                hideAddButton={true}
                requestId={request.id}
                attachments={request.approvalAttachments}
                checklist={request.checklist}
                readOnly={true}
                onEditAttachment={(attachmentId) =>
                  setViewingAttachment({
                    type: 'approvalAttachments',
                    id: attachmentId,
                  })
                }
              />
            ) : (
              <AttachmentTablePC
                requestId={request.id}
                attachments={request.approvalAttachments}
                readOnly={true}
                onEditAttachment={(attachmentId) =>
                  setViewingAttachment({
                    type: 'approvalAttachments',
                    id: attachmentId,
                  })
                }
              />
            )
          ) : (
            <Text as="i">No file</Text>
          )}
        </SectionContainer>
        <SectionContainer title="Reference File">
          {request.referenceAttachments.length > 0 ? (
            <AttachmentTablePC
              attachments={request.referenceAttachments}
              readOnly={true}
              onEditAttachment={(attachmentId) =>
                setViewingAttachment({
                  type: 'referenceAttachments',
                  id: attachmentId,
                })
              }
            />
          ) : (
            <Text as="i">No file</Text>
          )}
        </SectionContainer>
        <SectionContainer title={'Event & Comments'}>
          <EventComments />
        </SectionContainer>
      </Flex>
    </Flex>
  );
};

export default Content;
