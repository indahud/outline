import { observer } from "mobx-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import Flex from "~/components/Flex";
import Disclosure from "~/components/Sidebar/components/Disclosure";
import Text from "~/components/Text";

type Props = {
  selected: boolean;
  active: boolean;
  style: React.CSSProperties;
  expanded: boolean;
  icon?: React.ReactNode;
  title: string;
  depth: number;
  hasChildren: boolean;

  onDisclosureClick: (ev: React.MouseEvent) => void;
  onPointerMove: (ev: React.MouseEvent) => void;
  onClick: (ev: React.MouseEvent) => void;
};

function DocumentExplorerNode(
  {
    selected,
    active,
    style,
    expanded,
    icon,
    title,
    depth,
    hasChildren,
    onDisclosureClick,
    onPointerMove,
    onClick,
  }: Props,
  ref: React.RefObject<HTMLSpanElement>
) {
  const { t } = useTranslation();
  const OFFSET = 12;
  const ICON_SIZE = 24;

  const width = depth ? depth * ICON_SIZE + OFFSET : ICON_SIZE;

  return (
    <Node
      ref={ref}
      selected={selected}
      active={active}
      onClick={onClick}
      style={style}
      onPointerMove={onPointerMove}
      role="option"
    >
      <Spacer width={width}>
        {hasChildren && (
          <StyledDisclosure
            expanded={expanded}
            onClick={onDisclosureClick}
            tabIndex={-1}
          />
        )}
      </Spacer>
      {icon}
      <Title>{title || t("Untitled")}</Title>
    </Node>
  );
}

const Title = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 4px 0 4px;
  color: inherit;
`;

const StyledDisclosure = styled(Disclosure)`
  position: relative;
  left: auto;
  margin-top: 2px;
`;

const Spacer = styled(Flex)<{ width: number }>`
  flex-direction: row-reverse;
  flex-shrink: 0;
  width: ${(props) => props.width}px;
`;

export const Node = styled.span<{
  active: boolean;
  selected: boolean;
  style: React.CSSProperties;
}>`
  display: flex;
  user-select: none;
  overflow: hidden;
  font-size: 16px;
  width: ${(props) => props.style.width};
  color: ${(props) => props.theme.text};
  cursor: var(--pointer);
  padding: 12px;
  border-radius: 6px;
  background: ${(props) =>
    !props.selected && props.active && props.theme.listItemHoverBackground};

  svg {
    flex-shrink: 0;
  }

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.selected &&
    `
      background: ${props.theme.accent};
      color: ${props.theme.white};

      svg {
        fill: ${props.theme.white};
      }
    `}

  ${breakpoint("tablet")`
    padding: 4px;
    font-size: 15px;
  `}
`;

export default observer(React.forwardRef(DocumentExplorerNode));
