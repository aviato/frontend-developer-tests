import React from "react";
import { Card, CardContent, Box, Avatar, Typography } from "@material-ui/core";
import User from "../types/User";
import RoomIcon from "@material-ui/icons/Room";

interface Props {
  user: User;
}

const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Avatar>
            {user.name.first[0]}
            {user.name.last[0]}
          </Avatar>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5">
            {user.name.first} {user.name.last}
          </Typography>
          <Typography component="p" gutterBottom>
            {user.gender === "male" ? "Male	\u2642" : "Female	\u2640"}
          </Typography>
          <Typography component="p">
            <RoomIcon /> {user.location.city}, {user.location.state}
          </Typography>
          <Typography component="p">
            Registered: { (new Date(user.registered.date)).toLocaleString()}
            </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
