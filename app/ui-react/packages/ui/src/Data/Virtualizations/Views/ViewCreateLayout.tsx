// tslint:disable react-unused-props-and-state
// remove the above line after this goes GA https://github.com/Microsoft/tslint-microsoft-contrib/pull/824
import { Card, Grid, GridItem } from '@patternfly/react-core';
import * as React from 'react';
import { PageSection } from '../../../Layout';
import './ViewCreateLayout.css';

/**
 * @param header - Header Component for the Create View.
 * @param content - the main content of the wizard. In case of overflow, only
 * the body will scroll.
 * @param preview - The Preview section for selected connection on right side of page.
 */
export interface IViewCreateLayoutProps {
  header: JSX.Element;
  content: JSX.Element;
  selectedTables?: JSX.Element;
}

export const ViewCreateLayout: React.FunctionComponent<IViewCreateLayoutProps> = ({
  header,
  content,
  selectedTables,
}: IViewCreateLayoutProps) => {
  return (
    <div className={'view-create-layout'}>
      <div className={'view-create-layout__header'}>
        {header}
      </div>
      <div className={'view-create-layout__body'}>
        <div className={'view-create-layout__contentOuter'}>
          <div className={'view-create-layout__contentInner'}>
            <PageSection>
              <Card className={'view-create-layout__card'}>
                {selectedTables ? (
                  <Grid className={'view-create-layout__grid'}>
                    <GridItem
                      span={9}
                      className={'view-create-layout_connection'}
                    >
                      {content}
                    </GridItem>
                    <GridItem
                      span={3}
                      className={
                        'view-create-layout_previewSection'
                      }
                    >
                      {selectedTables}
                    </GridItem>
                  </Grid>
                ) : (
                  <Grid className={'view-create-layout__grid'}>
                    <GridItem span={12}>
                      {content}
                    </GridItem>
                  </Grid>
                )}
              </Card>
            </PageSection>
          </div>
        </div>
      </div>
    </div>
  );
};
