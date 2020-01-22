import Drawer from "@material-ui/core/Drawer";
import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawerPaperSide: {
    minWidth: "256px",
    // flexShrink: 0
  },
  drawerPaperBottom: {
    width: "100%",
    flexShrink: 0
  }
});

class DrawerModalUXP extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: this.props.open };
  }

  toggleDrawer = () => () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { classes } = this.props;

    const drawerWidth =
      this.props.anchor === "bottom" || this.props.anchor === "top"
        ? classes.drawerPaperBottom
        : classes.drawerPaperSide;

  const uxpContainer = document.querySelector("[data-id='canvas']");
  let drawerContainer = null;

  if (document.querySelector("#iframeContainer iframe")) {
    drawerContainer = document.querySelector("#iframeContainer iframe").contentWindow.document.body;
  } else if (document.querySelector("[data-id='canvas']")) {
    drawerContainer = document.querySelector("[data-id='canvas']");
  }
    return (
      <Drawer
        {...this.props}
        onClose={this.toggleDrawer()}
        open={this.state.open}
        variant={this.props.variant}
        anchor={this.props.anchor}
        SlideProps={uxpContainer ? { tabIndex: "null" } : null}
        container={drawerContainer}
        classes={{
          paper: drawerWidth
        }}
        minHeight={this.props.minHeight}
        style={{ minHeight: this.props.minHeight}}
        disableEnforceFocus
      >
        <div style={{minWidth: this.props.width}}>
        {this.props.children}
        </div>
      </Drawer>
    );
  }
}

DrawerModalUXP.propTypes = {
  /**
   * if `true` shows the drawer.
   */
  open: PropTypes.bool,

  /**
   * Side from which the drawer will appear.
   */
  anchor: PropTypes.oneOf(["left", "top", "right", "bottom"]),

  /**
   * The width of the drawer.
   */
  width: PropTypes.number,

  /**
   * Close event to use with UXPin interactions.
   */
  onClose: PropTypes.func,

  /**
   * The contents of the drawer.
   * @uxpinignoreprop
   */
  children: PropTypes.node,

    /**
   * The variant to use.
   * @uxpinignoreprop
   */
  variant: PropTypes.oneOf(["permanent", "persistent", "temporary"]),

  /**
   * Needed to display in UXP editor if variant is `permanent` or `persistent`
   * @uxpinignoreprop
   */
  minHeight: PropTypes.number,
};

export default withStyles(styles)(DrawerModalUXP);
