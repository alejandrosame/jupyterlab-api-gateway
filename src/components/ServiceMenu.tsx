import ListItem from '@material-ui/core/ListItem';
import * as React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { classes } from 'typestyle';
import {
  listItemClass,
  listItemIconClass,
  generateCodeButtonClass,
  wrapperClass
} from '../style/ServiceMenu';
import { settingsIcon } from '../style/icons';
import { IService, IEndpoint } from '../tokens';

const ITEM_HEIGHT = 24.8; // HTML element height for a single branch
const MIN_HEIGHT = 150; // Minimal HTML element height for the branches list
const MAX_HEIGHT = 400; // Maximal HTML element height for the branches list

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
      isCollapsed: false
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
      <div className={wrapperClass}>
        <div>
          <img src={service.thumbnail} alt={"Thumbnail for " + service.name} />
          <span>{service.name}</span>
        </div>
        {this._renderEndpointList()}
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
        <settingsIcon.react className={listItemIconClass} tag="span" />
        {endpoint.name}
        <input
          className={generateCodeButtonClass}
          type="button"
          title="Generate code for endpoint"
          value="Generate code"
          onClick={() => generateCode(endpoint)}
        />
      </ListItem>
    );
  };

}
