import { useQuery } from 'react-query';
import { MultipleSelect, FormControl, UserTag } from 'components/Base';
import { IRequestInput, getUsers, IUser } from 'api';
import { FC, memo, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useMsal } from '@azure/msal-react';

interface ParticipantsProps
  extends Pick<IRequestInput, 'advisors' | 'approvers' | 'observators'> {
  errors: Record<keyof Omit<IRequestInput, 'status'>, string>;
  setValue: (key: keyof Omit<IRequestInput, 'status'>, value: any) => void;
  mode: string;
}

const Participants: FC<ParticipantsProps> = ({
  advisors,
  approvers,
  observators,
  setValue,
  errors,
  mode,
}) => {
  const [userList, setUserList] = useState<
    (Pick<IUser, 'id' | 'email' | 'name'> & { display: JSX.Element })[]
  >([]);
  const { accounts } = useMsal();
  const { data: users } = useQuery('users', () => getUsers(), {
    onSuccess: (data) =>
      setUserList(
        data.map((user) => ({
          ...user,
          display: <UserTag email={user.email} name={user.name} />,
        }))
      ),
  });
  const readOnly = mode === 'revise';
  return users ? (
    <Flex direction="column">
      <FormControl
        label={'CC List'}
        error={
          observators.some((v) => advisors.concat(approvers).includes(v))
            ? 'Duplicate'
            : errors.observators
        }
      >
        <MultipleSelect
          selection={userList}
          value={observators.map(
            (observator) =>
              userList.find((user) => user.id === observator) as Pick<
                IUser,
                'id' | 'email' | 'name'
              >
          )}
          onSelect={(newUsers) =>
            setValue(
              'observators',
              newUsers.map((newUser) => newUser.id)
            )
          }
          readOnly={readOnly}
          displayField="display"
          searchable
        />
      </FormControl>
      <FormControl
        label="Advisor List"
        error={
          advisors.some((advisor) =>
            approvers.concat(observators).includes(advisor)
          )
            ? 'Duplicate'
            : errors.advisors
        }
      >
        <MultipleSelect
          selection={userList.filter(
            (user) => user.email !== accounts[0].username
          )}
          value={advisors.map(
            (advisor) =>
              userList.find((user) => user.id === advisor) as IUser & {
                display: JSX.Element;
              }
          )}
          onSelect={(newUsers) =>
            setValue(
              'advisors',
              newUsers.map((newUser) => newUser.id)
            )
          }
          readOnly={readOnly}
          displayField="display"
          searchable
        />
      </FormControl>
      <FormControl
        label={'Approver List'}
        error={
          approvers.some((v) => advisors.concat(observators).includes(v))
            ? 'Duplicate'
            : errors.approvers
        }
      >
        <MultipleSelect
          selection={userList}
          value={approvers.map(
            (approver) =>
              userList.find((user) => user.id === approver) as Pick<
                IUser,
                'id' | 'email' | 'name'
              >
          )}
          onSelect={(newUsers) =>
            setValue(
              'approvers',
              newUsers.map((newUser) => newUser.id)
            )
          }
          readOnly={readOnly}
          displayField="display"
          searchable
        />
      </FormControl>
    </Flex>
  ) : null;
};

export default memo(Participants);
