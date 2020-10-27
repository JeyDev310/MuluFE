import React, {useEffect, useState} from "react";
import { userService } from '../../_services';

function Persion(props) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        userService.getUserById(props.id).then(
            user => setUser(user),
            error => console.log(error)
        )
    }, []);
    return (
        <div>
            {user && <div>
                {user.firstName + ' ' + user.lastName + ', ' + (user.profession ? user.profession : '')}
            </div>}
        </div>
    )
}

export default Persion;