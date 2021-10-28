import FormControl from 'components/Base/FormControl';
import { useRef, useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import DocContent from './DocContent';
import { downloadAttachment, downloadStampAttachment } from 'api/file';
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  HStack,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Slider,
  useOutsideClick,
  Text,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';

const FormPopup = ({ attachment, requestId, isApproved, showStampButton }) => {
  const [popup, setPopup] = useState(false);
  const [position, setPosition] = useState<'right' | 'left'>('right');
  const [size, setSize] = useState(48);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref,
    handler: () => setPopup(false),
  });
  return (
    <Flex
      direction="column"
      h="full"
      w="full"
      overflow="hidden"
      rounded="md"
      border="1px"
      borderColor="gray.200"
    >
      <Flex
        justifyContent="space-between"
        bg="gray.50"
        p={4}
        align="center"
        pos="relative"
      >
        <Heading size="sm">{attachment.name}</Heading>
        <HStack>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              downloadAttachment({
                name: attachment.name,
                file: attachment.file,
                fields: attachment.fields,
              })
            }
            leftIcon={<BsDownload />}
          >
            Original
          </Button>
          {isApproved && showStampButton && (
            <Button
              size="sm"
              leftIcon={<BsDownload />}
              onClick={() => setPopup(true)}
            >
              Stamp
            </Button>
          )}
        </HStack>
        <Box
          pos="absolute"
          overflow="visible"
          width="fit-content"
          zIndex="dropdown"
          top={'100%'}
          right="0.5rem"
          transform={'translateY(0.5rem);'}
        >
          <Collapse in={popup} unmountOnExit animateOpacity>
            <Box
              ref={ref}
              minW="20rem"
              zIndex="dropdown"
              bg="gray.50"
              shadow="base"
              rounded="md"
              p={4}
            >
              <FormControl label="QR stamp size">
                <Slider
                  aria-label="slider-ex-1"
                  value={size}
                  onChange={setSize}
                  min={24}
                  max={72}
                  step={1}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb p={2}>
                    <Text fontSize="xs">{size}</Text>
                  </SliderThumb>
                </Slider>
              </FormControl>
              <FormControl label="QR stamp position">
                <RadioGroup
                  onChange={(newValue) =>
                    setPosition(newValue as 'left' | 'right')
                  }
                  value={position}
                >
                  <Stack direction="row" justify="space-evenly">
                    <Radio value="left">Left</Radio>
                    <Radio value="right">Right</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <Button
                onClick={() =>
                  downloadStampAttachment({
                    name: attachment.name,
                    file: attachment.file,
                    fields: attachment.fields,
                    position,
                    size,
                    requestId,
                  })
                }
                w="full"
                leftIcon={<BsDownload />}
              >
                Download
              </Button>
            </Box>
          </Collapse>
        </Box>
      </Flex>
      <Box flex={1} pos="relative" overflow="overlay">
        <DocContent attachment={attachment} />
      </Box>
    </Flex>
  );
};

export default FormPopup;
