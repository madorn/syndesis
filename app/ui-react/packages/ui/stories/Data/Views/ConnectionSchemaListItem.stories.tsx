import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { ConnectionSchemaListItem, ConnectionStatus } from '../../../src';

const stories = storiesOf('Data/Views/ConnectionSchemaListItem', module);

const connectionName = 'Connection_1';
const connectionDescription = 'Connection_1 description';

stories.add('ACTIVE, not loading', () => (
  <ConnectionSchemaListItem
    connectionName={connectionName}
    connectionDescription={connectionDescription}
    haveSelectedSource={false}
    dvStatus={ConnectionStatus.ACTIVE}
    dvStatusTooltip={'The connection is active'}
    icon={<div />}
    loading={false}
  />
));

stories.add('ACTIVE, loading', () => (
  <ConnectionSchemaListItem
    connectionName={connectionName}
    connectionDescription={connectionDescription}
    haveSelectedSource={false}
    dvStatus={ConnectionStatus.ACTIVE}
    dvStatusTooltip={'The connection is active'}
    icon={<div />}
    loading={true}
  />
));

stories.add('INACTIVE, loading', () => (
  <ConnectionSchemaListItem
    connectionName={connectionName}
    connectionDescription={connectionDescription}
    haveSelectedSource={false}
    dvStatus={ConnectionStatus.INACTIVE}
    dvStatusTooltip={'The connection is inactive'}
    icon={<div />}
    loading={true}
  />
));

stories.add('FAILED, not loading', () => (
  <ConnectionSchemaListItem
    connectionName={connectionName}
    connectionDescription={connectionDescription}
    haveSelectedSource={false}
    dvStatus={ConnectionStatus.FAILED}
    dvStatusTooltip={'The server exception is displayed here'}
    icon={<div />}
    loading={false}
  />
));
