import { H2, PrivateContent } from "../../components";
import { UserRow, TableRow } from "./components";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { checkAccess } from "../../utils";
import { ROLE } from "../../constants";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { request } from "../../utils/request";

const UsersContainer = ({ className }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
  const userRole = useSelector(selectUserRole);

  useEffect(() => {
    if (!checkAccess([ROLE.ADMINISTRATOR], userRole)) {
      return;
    }

    Promise.all([request("/users"), request("/users/roles")]).then(
      ([usersRes, rolesRes]) => {
        if (usersRes.error || rolesRes.error) {
          setErrorMessage(usersRes.error || rolesRes.error);
          return;
        }
        setUsers(usersRes.data);
        setRoles(rolesRes.data);
      }
    );
  }, [shouldUpdateUserList, userRole]);

  const onUserRemove = (userId) => {
    if (!checkAccess([ROLE.ADMINISTRATOR], userRole)) {
      return;
    }
    request(`/users/${userId}`, "DELETE").then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };

  return (
    <PrivateContent access={[ROLE.ADMINISTRATOR]} serverError={errorMessage}>
      <div className={className}>
        <H2>Пользователи</H2>
        <div>
          <TableRow>
            <div className="login-column">логин</div>
            <div className="registed-at-column">дата регистрации</div>
            <div className="role-column">роль</div>
          </TableRow>

          {users.map(({ id, registeredAt, roleId, login }) => (
            <UserRow
              id={id}
              key={id}
              login={login}
              registeredAt={registeredAt}
              roleId={roleId}
              roles={roles.filter(({ id }) => id !== ROLE.GUEST)}
              onUserRemove={() => onUserRemove(id)}
            />
          ))}
        </div>
      </div>
    </PrivateContent>
  );
};

export const Users = styled(UsersContainer)`

font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width 570px;

`;
