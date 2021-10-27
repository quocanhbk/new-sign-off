import Header from './Header';
import {
  SectionContainer,
  FormControl,
  SubmitConfirmAlert,
  MultipleSelect,
} from 'components/Base';
import { navigate, RouteComponentProps } from '@reach/router';
import ProcedureChecklist from '../../ProcedureChecklist';
import useProcedure from './useProcedure';
import { Flex, Input } from '@chakra-ui/react';
import { getDepartments, IDepartment } from 'api/department';
import { useQuery } from 'react-query';

interface DetailProps extends RouteComponentProps {
  id?: string;
}

const Detail = ({ id }: DetailProps) => {
  const onEditClick = () => {
    navigate('/procedure/create/' + id);
  };

  const {
    data: procedure,
    render,
    deletePopup,
    isGettingPosition,
    mappedPosition,
    mutateDeleteProcedure,
    mutateActivateProcedure,
    setDeletePopup,
  } = useProcedure(id!);

  const { data } = useQuery('departments', getDepartments, {
    initialData: [],
  });
  return (
    <Flex direction="column" h="full" pos="relative">
      {render(
        procedure && !isGettingPosition ? (
          <>
            <SubmitConfirmAlert
              isOpen={deletePopup}
              onClose={() => setDeletePopup(false)}
              title={`Delete ${procedure.title}`}
              onConfirm={mutateDeleteProcedure}
              color="red"
            />
            <Header
              title={procedure.title}
              isActive={procedure.isActive}
              onDeleteClick={() => setDeletePopup(true)}
              onEditClick={onEditClick}
              onActivateProcedure={mutateActivateProcedure}
            />
            <Flex flex={1} w="full" justify="center" overflow="auto">
              <Flex
                direction="column"
                w="full"
                maxW="48rem"
                className="scroller"
                overflow="auto"
                p={4}
              >
                <SectionContainer title={'Primary Info'}>
                  <FormControl label="Title">
                    <Input
                      value={procedure.title}
                      spellCheck="false"
                      readOnly
                    />
                  </FormControl>
                  <FormControl label="Description">
                    <Input
                      value={procedure.description}
                      spellCheck="false"
                      readOnly
                    />
                  </FormControl>
                  <FormControl label="Type">
                    <Input value={procedure.type} spellCheck="false" readOnly />
                  </FormControl>
                  {data && (
                    <FormControl label="Departments">
                      <MultipleSelect
                        searchable
                        selection={data}
                        value={procedure.departments.map(
                          (departmentId) =>
                            data.find(
                              (department) => department.id === departmentId
                            ) as IDepartment
                        )}
                        displayField="name"
                        readOnly
                      />
                    </FormControl>
                  )}
                </SectionContainer>
                <SectionContainer title="Participants">
                  <FormControl label={'CC List'}>
                    <MultipleSelect
                      selection={mappedPosition}
                      value={mappedPosition.filter((u) =>
                        procedure.observators.map((a) => a.id).includes(u.id)
                      )}
                      displayField={'display'}
                      readOnly
                    />
                  </FormControl>
                  <FormControl label={'Advisor List'}>
                    <MultipleSelect
                      selection={mappedPosition}
                      value={mappedPosition.filter((u) =>
                        procedure.advisors.map((a) => a.id).includes(u.id)
                      )}
                      displayField={'display'}
                      readOnly
                    />
                  </FormControl>
                  <FormControl label={'Approver List'}>
                    <MultipleSelect
                      selection={mappedPosition}
                      value={mappedPosition.filter((u) =>
                        procedure.approvers.map((a) => a.id).includes(u.id)
                      )}
                      displayField={'display'}
                      readOnly
                    />
                  </FormControl>
                </SectionContainer>
                <SectionContainer title="Attachment Checklist">
                  <ProcedureChecklist checklist={procedure.checklist} />
                </SectionContainer>
              </Flex>
            </Flex>
          </>
        ) : null
      )}
    </Flex>
  );
};

export default Detail;
