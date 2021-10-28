// * DESCRIPTION: view attachment on search page

import { ChakraModal } from 'components/Base';
import FormPopup from './FormPopup';
import { useRequestContext } from './RequestProvider';

const ViewAttachmentModal = () => {
  const {
    viewingAttachment,
    request,
    setViewingAttachment,
  } = useRequestContext();
  const req = request!;
  return (
    <ChakraModal
      isOpen={!!viewingAttachment}
      onClose={() => setViewingAttachment(null)}
      size="6xl"
      noPadding
    >
      {viewingAttachment && (
        <FormPopup
          attachment={req[viewingAttachment.type].find(
            (attachment) => attachment.id === viewingAttachment.id
          )}
          requestId={req.id}
          showStampButton={viewingAttachment.type === 'approvalAttachments'}
          isApproved={req.status === 'Approved'}
        />
      )}
    </ChakraModal>
  );
};

export default ViewAttachmentModal;
