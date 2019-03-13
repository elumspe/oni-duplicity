import * as React from "react";
import { GeyserBehavior, GeyserType } from "oni-save-parser";
import classnames from "classnames";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/lab/Slider";

import AbstractGeyserEditor from "@/services/oni-save/components/AbstractGeyserEditor";

export interface GeyserListItemProps {
  gameObjectId: number;
  className?: string;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing.unit * 45,
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing.unit * 2
    },
    titleBar: {
      display: "flex",
      flexDirection: "row",
      marginBottom: theme.spacing.unit
    },
    titleControls: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "auto"
    },
    sliderSection: {
      marginTop: theme.spacing.unit
    },
    valueLabel: {
      marginBottom: theme.spacing.unit
    }
  });

type Props = GeyserListItemProps & StyleProps<typeof styles>;

const GeyserListItem: React.SFC<Props> = ({
  classes,
  className,
  gameObjectId
}) => (
  <AbstractGeyserEditor gameObjectId={gameObjectId}>
    {({ geyserType, emitRate, onChangeEmitRate, onChangeGeyserType }) => (
      <Paper className={classnames(className, classes.root)}>
        <div className={classes.titleBar}>
          <Typography variant="h6">{geyserType}</Typography>
          <div className={classes.titleControls} />
        </div>
        <Divider />
        <Select
          value={geyserType || ""}
          onChange={e => onChangeGeyserType(e.target.value)}
        >
          {keysOfType(GeyserType).map(typeName => (
            <MenuItem key={typeName} value={typeName}>
              {typeName}
            </MenuItem>
          ))}
        </Select>
        <div className={classes.sliderSection}>
          <Typography className={classes.valueLabel} id="rate-label">
            Rate
          </Typography>
          <Slider
            aria-labelledby="rate-label"
            value={emitRate || 0}
            min={0}
            max={1}
            onChange={(_, value) => onChangeEmitRate(value)}
          />
        </div>
      </Paper>
    )}
  </AbstractGeyserEditor>
);

export default withStyles(styles)(GeyserListItem);

function keysOfType<T>(type: T): (keyof T)[] {
  return Object.keys(type) as any;
}