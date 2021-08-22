import { Grid } from "@geist-ui/react";

export default function Container(props) {
  return (
    <div style={props.style} css={props.css}>
      <Grid.Container width="100%" justify="center">
        <Grid xs={22} sm={18} md={16}>
          <div css={{ width: "100%" }}>{props.children}</div>
        </Grid>
      </Grid.Container>
    </div>
  );
}
