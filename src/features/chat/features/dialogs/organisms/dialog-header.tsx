import React from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";

import {UserAvatar} from "@features/user";
import {Avatar, Button, Icon, Text, Skeleton} from "@ui/atoms";
import * as selectors from "../selectors";

export const DialogHeader: React.FC = () => {
  const dialog = useSelector(selectors.dialogSelector);
  const isCompanionFetching = useSelector(selectors.isCompanionFetchingSelector);

  const companion = dialog?.companion;
  const info = dialog?.status || (companion?.online ? "Online" : "Offline");

  return (
    <Header>
      <HeaderInfo>
        <HeaderAvatar>
          {isCompanionFetching ? <Skeleton.Avatar secondary /> : companion ? <UserAvatar user={companion} /> : null}
        </HeaderAvatar>

        <HeaderContent>
          {isCompanionFetching ? <Skeleton.Text width="15rem" secondary /> : <Text type="bold" space="nowrap" primary>{companion?.fullName}</Text>}
          {isCompanionFetching ? <Skeleton.Text width="10rem" secondary /> : <Text>{info}</Text>}
        </HeaderContent>
      </HeaderInfo>

      <HeaderOptions>
        <Button pure>
          <Icon name="loupe" />
        </Button>

        <Button pure>
          <Icon name="attachment" />
        </Button>
      </HeaderOptions>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 2px solid ${({theme}) => theme.palette.divider};
  padding: 2rem;
`;

const HeaderInfo = styled.div`
  display: flex;
  width: 75%;
`;

const HeaderAvatar = styled.div`
  width: 6.5rem;
  height: 6.5rem;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 75%;
  padding: 1rem 0 1rem 1.5rem;
`;

const HeaderOptions = styled.div`
  display: flex;
  align-items: center;

  & > :not(:first-child) {
    margin-left: 3rem;
  }
`;