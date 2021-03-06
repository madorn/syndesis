import {
  useViewDefinitionDescriptors,
  useVirtualizationHelpers,
} from '@syndesis/api';
import {
  ImportSources,
  ViewDefinitionDescriptor,
  ViewInfo,
  Virtualization,
} from '@syndesis/models';
import { ViewsImportLayout } from '@syndesis/ui';
import { useRouteData } from '@syndesis/utils';
import * as React from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UIContext } from '../../../../app';
import resolvers from '../../../resolvers';
import { ViewInfosContent, ViewsImportSteps } from '../../shared';

/**
 * @param virtualizationId - the ID of the virtualization for the wizard.
 */
export interface ISelectViewsRouteParams {
  virtualizationId: string;
}

/**
 * @param virtualization - the virtualization for the wizard.
 * @param connectionId - the id of the selected connection
 */
export interface ISelectViewsRouteState {
  virtualization: Virtualization;
  connectionId: string;
}

export interface ISelectViewsPageProps {
  selectedViews: ViewInfo[];
  handleAddView: (view: ViewInfo) => void;
  handleRemoveView: (viewName: string) => void;
  handleSelectAll: (isSelected: boolean, AllViewInfo: any[]) => void;
}

export const SelectViewsPage: React.FunctionComponent<
  ISelectViewsPageProps
> = props => {
  const { params, state, history } = useRouteData<
    ISelectViewsRouteParams,
    ISelectViewsRouteState
  >();
  const [saveInProgress, setSaveInProgress] = React.useState(false);
  const { pushNotification } = useContext(UIContext);
  const { t } = useTranslation(['data']);
  const { importSource } = useVirtualizationHelpers();

  const getExistingViewNames = (
    defnDescriptors: ViewDefinitionDescriptor[]
  ) => {
    const viewNames: string[] = [];
    for (const descriptor of defnDescriptors) {
      viewNames.push(descriptor.name);
    }
    return viewNames;
  };

  const setInProgress = async (isWorking: boolean) => {
    setSaveInProgress(isWorking);
  };

  const virtualization = state.virtualization;
  const { resource: viewDefinitionDescriptors } = useViewDefinitionDescriptors(
    virtualization.name
  );

  const handleCreateViews = async () => {
    setInProgress(true);
    const viewNames = props.selectedViews.map(
      selectedView => selectedView.viewName
    );
    const connName = props.selectedViews[0].connectionName;
    const importSources: ImportSources = {
      tables: viewNames,
    };

    try {
      await importSource(params.virtualizationId, connName, importSources);
      pushNotification(
        t('importViewsSuccess', {
          name: virtualization.name,
        }),
        'success'
      );
    } catch (error) {
      const details = error.message ? error.message : '';
      pushNotification(
        t('importViewsFailed', {
          details,
          name: virtualization.name,
        }),
        'error'
      );
    }
    setInProgress(false);
    history.push(
      resolvers.data.virtualizations.views.root({
        virtualization,
      })
    );
  };

  return (
    <ViewsImportLayout
      header={<ViewsImportSteps step={2} />}
      content={
        <ViewInfosContent
          connectionName={state.connectionId}
          existingViewNames={getExistingViewNames(viewDefinitionDescriptors)}
          onViewSelected={props.handleAddView}
          onViewDeselected={props.handleRemoveView}
          selectedViews={props.selectedViews}
          handleSelectAll={props.handleSelectAll}
        />
      }
      cancelHref={resolvers.data.virtualizations.views.root({
        virtualization,
      })}
      backHref={resolvers.data.virtualizations.views.importSource.selectConnection(
        { virtualization }
      )}
      onCreateViews={handleCreateViews}
      isNextDisabled={props.selectedViews.length < 1}
      isNextLoading={saveInProgress}
      isLastStep={true}
    />
  );
};
