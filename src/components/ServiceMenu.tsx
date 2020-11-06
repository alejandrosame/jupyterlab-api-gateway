import ListItem from '@material-ui/core/ListItem';
import {
  caretDownIcon,
  caretUpIcon,
  //addIcon
} from '@jupyterlab/ui-components';
import * as React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { classes } from 'typestyle';
import {
  listItemClass,
  generateCodeButtonClass,
  generateCodeButtonIconClass,
  serviceMenuButtonClass,
  serviceMenuButtonEnabledClass,
  serviceMenuButtonIconClass,
  serviceMenuButtonSubtitleClass,
  serviceMenuButtonTitleClass,
  serviceMenuButtonTitleWrapperClass,
  serviceMenuButtonThumbnailClass,
  serviceMenuWrapperClass,
} from '../style/ServiceMenu';
import { IService, IEndpoint } from '../tokens';

const ITEM_HEIGHT = 24.8; // HTML element height for a single endpoint
const MIN_HEIGHT = 75; // Minimal HTML element height for the endpoints list
const MAX_HEIGHT = 400; // Maximal HTML element height for the endpoints list

/**
 * Interface describing component properties.
 */
export interface IServiceMenuProps {
  /**
   * Service to render
   */
  service: IService;

  /**
   * Callback to invoke in order to generate code for the selected endpoint.
   *
   * @returns promise which generates code for the selected endpoint.
   */
  generateCode: (endpoint: IEndpoint) => void;
}

/**
 * Interface describing component state.
 */
export interface IServiceMenuState {
  /**
   * Service entry collapsed state.
   */
  isCollapsed: boolean;
}

/**
 * React component for rendering an endpoint menu.
 */
export class ServiceMenu extends React.Component<
  IServiceMenuProps,
  IServiceMenuState
> {
  /**
   * Returns a React component for rendering an endpoint menu.
   *
   * @param props - component properties
   * @returns React component
   */
  constructor(props: IServiceMenuProps) {
    super(props);

    this.state = {
      isCollapsed: true
    };
  }

  /**
   * Renders the component.
   *
   * @returns React element
   */
  render(): React.ReactElement {
    const service = this.props.service;
    return (
      <div className={serviceMenuWrapperClass}>
        <button
          className={classes(
            serviceMenuButtonClass,
            serviceMenuButtonEnabledClass
          )}
          title={'Show/hide service endpoints'}
          onClick={this._onServiceClick}
        >
          {this.state.isCollapsed ? (
            <caretDownIcon.react className={serviceMenuButtonIconClass} />
          ) : (
            <caretUpIcon.react className={serviceMenuButtonIconClass} />
          )}
          <div className={serviceMenuButtonTitleWrapperClass}>
            <p className={serviceMenuButtonTitleClass}>{service.name}</p>

            <p className={serviceMenuButtonSubtitleClass}>
              <img
                className={serviceMenuButtonThumbnailClass}
                src={service.thumbnail}
                alt={"Thumbnail for " + service.name}
              />
              {service.description || ''}
            </p>
          </div>
        </button>

        {!this.state.isCollapsed ? this._renderEndpointList() : null}
      </div>
    );
  }

  /**
   * Renders a
   *
   * @returns React element
   */
  private _renderEndpointList(): React.ReactElement {
    const endpoints = this.props.service.endpoints;
    return (
      <FixedSizeList
        height={Math.min(
          Math.max(MIN_HEIGHT, endpoints.length * ITEM_HEIGHT),
          MAX_HEIGHT
        )}
        itemCount={endpoints.length}
        itemData={endpoints}
        itemKey={(index, data) => data[index].name}
        itemSize={ITEM_HEIGHT}
        style={{ overflowX: 'hidden', paddingTop: 0, paddingBottom: 0 }}
        width={'auto'}
      >
        {this._renderItem}
      </FixedSizeList>
    );
  }

  /**
   * Renders a menu item.
   *
   * @param props Row properties
   * @returns React element
   */
  private _renderItem = (props: ListChildComponentProps): JSX.Element => {
    const { data, index, style } = props;
    const endpoint = data[index] as IEndpoint;
    const generateCode = this.props.generateCode;
    return (
      <ListItem
        title={`Endpoint: ${endpoint.name}`}
        className={classes(listItemClass)}
        style={style}
      >
        {'• ' + endpoint.name}
        <button
          className={generateCodeButtonClass}
          onClick={() => generateCode(endpoint)}
        >
          <p className={generateCodeButtonIconClass}>+</p>
        </button>
      </ListItem>
    );
  };

  /**
   * Callback invoked upon clicking a button to open/close the service menu.
   *
   * @param event - event object
   */
  private _onServiceClick = (): void => {
    // Toggle the service menu:
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  };

}
