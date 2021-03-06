import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../state/ducks';

const { loginThunk } = userActions;

/**
 * this React hook allows the calling component the agency to check
 * whether the user signed into the app is a ADMIN, TEACHER, or STUDENT, respectively.
 *
 * The calling component will be provided with an Object containing three properties.
 * Each of those properties will hold a helper function that returns a boolean value
 * to denote whether the user signed in is a certain role.
 *
 * EXAMPLE USE CASE COMMENTED OUT AT THE BOTTOM OF THIS FILE
 *
 */
export const useUserRole = () => {
  /** allows for us to dispatch actions to the store */
  const dispatch = useDispatch();

  /** the role of the user logged in */
  const { role } = useSelector(state => state.user);

  /**
   * this useEffect fires on component render.
   *
   * If the role is not defined, then we will dispatch our `loginThunk`
   * to get user info.
   *
   * `dispatch` wi
   */
  useEffect(() => {
    if (!role) {
      dispatch(loginThunk());
    }
  }, [role, dispatch]); // dispatch will never change, role should only change from `undefined` to `"ADMIN" | "TEACHER" | "STUDENT"`

  /** returns boolean indicating whether our user is an ADMIN */
  const userIsAdmin = () => role === 'ADMIN';

  /** returns a boolean indicating whether our user is a TEACHER */
  const userIsTeacher = () => role === 'TEACHER';

  /** returns a boolean indicating whether our user is a STUDENT */
  const userIsStudent = () => role === 'STUDENT';

  // provide the above helper functions to any component which calls this hook
  return { userIsAdmin, userIsTeacher, userIsStudent };
};

// EXAMPLE USE CASE OF useUserRole hook !!
/*
const ExampleComponent = props => {

  const { userIsAdmin, userIsTeacher } = useUserRole();

  return (
    <>
      {
        // if a user was an ADMIN they'd see this button
        userIsAdmin() && <button onClick={() => deleteImportantStuff()}>DELETE</button>
      }

      {
        // * if a user was an ADMIN -or- a TEACHER, they'd see this button
        (userIsAdmin() || userIsTeacher()) && <button onClick={() => editImportantStuff()}>EDIT</button>
      }
      // no matter what role the student was, they'd see this div
      <div>Any user could see this div</div>
    </>
  );

};

*/
