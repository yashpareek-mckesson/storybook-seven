import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import PropTypes from "prop-types";
import { CommonUtils } from "../../";
import styles from "./assets/TabList.module.scss";
import useWindowSize from "../../common/hook/UseWindowSize";

export const TabList = (props) => {
  const { options, alignment, onTabClick, showShadow, useAsButton } = props;
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [secondaryNavWidth, setSecondaryNavWidth] = useState(window.innerWidth);
  const [navPanel, setNavPanel] = useState(null);
  const secondaryNavRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const navPanel = document.getElementById("secondaryNavPanel");
    setNavPanel(navPanel);
  }, []);

  const isScrollBarAtStartingPosition = () => {
    return navPanel && navPanel.scrollLeft === 0;
  };

  const isScrollBarAtEndingPosition = () => {
    return (
      navPanel &&
      navPanel.scrollLeft <= getTabListWidth() - navPanel.offsetWidth
    );
  };

  const getTabListWidth = () => {
    let iteratedTabsTotalWidth = 0;
    if (
      tabsContainerRef &&
      tabsContainerRef.current &&
      tabsContainerRef.current.childNodes
    ) {
      for (let newTabButton of tabsContainerRef.current.childNodes) {
        let newTabWidth = newTabButton.scrollWidth;
        iteratedTabsTotalWidth = iteratedTabsTotalWidth + newTabWidth;
      }
    }
    return iteratedTabsTotalWidth;
  };

  const [showRightScrollButton, setShowRightScrollButton] = useState(
    isScrollBarAtEndingPosition()
  );

  const [showLeftScrollButton, setShowLeftScrollButton] = useState(
    !isScrollBarAtStartingPosition()
  );

  const isOverflowed = (elementWidth, containerWidth) => {
    return elementWidth > containerWidth;
  };

  useEffect(() => {
    let iteratedTabsTotalWidth = getTabListWidth();
    if (isOverflowed(iteratedTabsTotalWidth, secondaryNavWidth)) {
      setIsScrollEnabled(true);
    } else {
      setIsScrollEnabled(false);
    }
    setShowLeftScrollButton(!isScrollBarAtStartingPosition());
    setShowRightScrollButton(isScrollBarAtEndingPosition());
  }, [secondaryNavWidth, isScrollBarAtEndingPosition]);

  useEffect(() => {
    secondaryNavRef &&
      secondaryNavRef.current &&
      secondaryNavRef.current.offsetWidth &&
      setSecondaryNavWidth(secondaryNavRef.current.offsetWidth);
  }, [windowSize, location.pathname]);

  const leftScroll = () => {
    let iteratedTabsTotalWidth = 0; // initial Position
    const tabsContainerWidth = navPanel.offsetWidth;
    for (let newTabButton of tabsContainerRef.current.childNodes) {
      let newTabWidth = newTabButton.scrollWidth;
      let scrollbarPosition = navPanel.scrollLeft;
      iteratedTabsTotalWidth = iteratedTabsTotalWidth + newTabWidth;

      if (isOverflowed(iteratedTabsTotalWidth, scrollbarPosition)) {
        if (iteratedTabsTotalWidth - navPanel.scrollLeft >= newTabWidth) {
          /*
           * if First Tab is displayed Completely in Container from left
           * then scroll left to all new previous tabs
           */
          navPanel.scrollBy({
            left: -tabsContainerWidth,
            behavior: "smooth",
          });
        } else {
          /*
           * if First Tab is displayed partially
           *  then scroll left so that partially displayed tab
           *  will display completely in the last
           */
          navPanel.scrollBy({
            left:
              -tabsContainerWidth +
              (iteratedTabsTotalWidth - scrollbarPosition),
            behavior: "smooth",
          });
        }
        break;
      }
    }
  };

  /*
   * Right Scroll Nav-items.
   */
  const rightScroll = () => {
    // const navPanel = document.getElementById('secondaryNavPanel');
    let iteratedTabsTotalWidth = 0;
    const tabsContainerWidth = navPanel.offsetWidth;
    for (let newTabButton of tabsContainerRef.current.childNodes) {
      let newTabWidth = newTabButton.scrollWidth;
      let scrollbarPosition = navPanel.scrollLeft;
      iteratedTabsTotalWidth = iteratedTabsTotalWidth + newTabWidth;
      if (
        isOverflowed(
          iteratedTabsTotalWidth,
          tabsContainerWidth + scrollbarPosition
        )
      ) {
        /*
         * If tab is overflowed from right
         */
        navPanel.scrollBy({
          left: iteratedTabsTotalWidth - (scrollbarPosition + newTabWidth),
          behavior: "smooth",
        });
        break;
      }
    }
  };

  /*
   * Scroll event
   */
  const onScrollEvent = () => {
    setShowLeftScrollButton(!isScrollBarAtStartingPosition());
    setShowRightScrollButton(isScrollBarAtEndingPosition());
  };

  return (
    <div
      className={`${styles.secondaryNav} + ${
        !showShadow && styles.secondaryNavNoShadaow
      }`}
      id="secondaryNav"
      ref={secondaryNavRef}
    >
      {CommonUtils.isNonEmptyArray(options) &&
        isScrollEnabled &&
        showLeftScrollButton && (
          <button
            id="leftScrollButton"
            className={styles.leftScrollButton}
            onClick={() => leftScroll()}
            aria-label="leftScrollButton"
          >
            <AiOutlineLeft />
          </button>
        )}
      <nav
        id="secondaryNavPanel"
        onScroll={onScrollEvent}
        className={`${styles.secondaryNavPanel} + ${
          styles[`justify-${alignment}`]
        } + ${isScrollEnabled && styles.leftPadding} + ${
          isScrollEnabled && styles.rightPadding
        }`}
      >
        {CommonUtils.isNonEmptyArray(options) && (
          <ul ref={tabsContainerRef}>
            {options.map((tab, index) => (
              <li key={index + "_" + tab.id}>
                {useAsButton ? (
                  <button
                    className={`${styles.tab} +
                    ${tab.isActiveTab ? styles["tab--active"] : null}`}
                    data-testid="tabItem"
                    onClick={() => onTabClick({ ...tab, index })}
                  >
                    {tab.configName}
                  </button>
                ) : (
                  <a
                    href={tab.path}
                    data-testid="tabItem"
                    className={`${styles.tab} +
                    ${tab.isActiveTab ? styles["tab--active"] : null}`}
                  >
                    {tab.configName}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </nav>

      {CommonUtils.isNonEmptyArray(options) &&
        isScrollEnabled &&
        showRightScrollButton && (
          <button
            id="rightScrollButton"
            className={styles.rightScrollButton}
            onClick={() => rightScroll()}
            aria-label="rightScrollButton"
          >
            <AiOutlineRight />
          </button>
        )}
    </div>
  );
};

TabList.propTypes = {
  options: PropTypes.array,
  alignment: PropTypes.oneOf(["left", "center", "right"]),
  onTabClick: PropTypes.func,
  showShadow: PropTypes.bool,
  useAsButton: PropTypes.bool,
};

TabList.defaultProps = {
  alignment: "center",
  showShadow: true,
  useAsButton: false,
};
