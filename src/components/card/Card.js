import PropTypes from "prop-types";
import React, { useState, useEffect, useMemo, memo } from "react";
import { IconButton } from "../iconButton";
import { Badge } from "../badge";
import CARD_TYPE from "./constants/CardConstants";
import cardStyles from "./assets/Card.module.scss";
import useWindowSize from "../../common/hook/UseWindowSize";

const CardHeader = memo(
  ({ badge, title, showArrow, isExpand, headerToolbar, handleClick, uId }) => {
    const memoizedBadge = useMemo(() => badge, [badge]);
    let windowSize = useWindowSize();
    const isMobileView = () => {
      return windowSize.width < 576;
    };

    return (
      <div className={cardStyles.card_header} data-testid="cardHeaderComp">
        <div className={cardStyles.title_wrap}>
          {title}
          {memoizedBadge &&
            memoizedBadge.length > 0 &&
            memoizedBadge.map(
              (e, idx) =>
                e && (
                  <div
                    key={idx}
                    className={cardStyles.pl_16 + " d-none d-md-block"}
                  >
                    <Badge text={e} />
                  </div>
                )
            )}
        </div>
        {showArrow && (
          <div className={cardStyles.d_flex}>
            <div className={cardStyles.icon_wrap}>
              <div className={cardStyles.flexContainer}>
                {memoizedBadge &&
                  memoizedBadge.length > 0 &&
                  memoizedBadge.map(
                    (e, idx) =>
                      e && (
                        <div key={idx} className="d-sm-block d-md-none pl-6">
                          <Badge text={e} />
                        </div>
                      )
                  )}
              </div>
              <div className={cardStyles.flexContainer}>
                {headerToolbar &&
                  !isExpand &&
                  headerToolbar.length > 0 &&
                  headerToolbar.map(
                    (item, index) =>
                      item.display && (
                        <div
                          key={index}
                          className={`${cardStyles.icon_color} ${cardStyles.button_wrap}`}
                          onClick={(e) => {
                            item.iconFn && item.iconFn(e);
                            e.stopPropagation();
                          }}
                        >
                          {item.icon}
                        </div>
                      )
                  )}
              </div>
            </div>
            <div data-testid="expandBtn">
              <IconButton
                className={cardStyles.arrow_style}
                onClick={handleClick}
                variant="secondaryIcon"
                size="largeIcon"
                icon={
                  isExpand ? (
                    <svg
                      width={isMobileView() ? "18px" : "22px"}
                      height={isMobileView() ? "18px" : "22px"}
                      fontSize={isMobileView() ? "18px" : "22px"}
                      viewBox={isMobileView() ? "0 0 18 18" : "0 0 22 22"}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {isMobileView() ? (
                        <path
                          fill="#007CC1"
                          d="M 9.042969 3.351562 C 9.289062 3.351562 9.53125 3.402344 9.753906 3.503906 C 9.976562 3.605469 10.175781 3.753906 10.339844 3.9375 L 17.699219 12.300781 C 17.929688 12.578125 18.046875 12.933594 18.019531 13.296875 C 17.992188 13.65625 17.824219 13.992188 17.550781 14.230469 C 17.28125 14.46875 16.925781 14.59375 16.5625 14.574219 C 16.203125 14.554688 15.863281 14.394531 15.617188 14.128906 L 9.183594 6.816406 C 9.164062 6.796875 9.144531 6.78125 9.121094 6.769531 C 9.09375 6.757812 9.070312 6.753906 9.042969 6.753906 C 9.015625 6.753906 8.988281 6.757812 8.964844 6.769531 C 8.941406 6.78125 8.917969 6.796875 8.902344 6.816406 L 2.46875 14.128906 C 2.347656 14.273438 2.203125 14.386719 2.039062 14.472656 C 1.875 14.554688 1.695312 14.605469 1.511719 14.621094 C 1.328125 14.636719 1.140625 14.613281 0.964844 14.554688 C 0.792969 14.496094 0.628906 14.402344 0.492188 14.28125 C 0.351562 14.15625 0.238281 14.007812 0.160156 13.84375 C 0.078125 13.675781 0.03125 13.496094 0.0234375 13.3125 C 0.0117188 13.128906 0.0390625 12.945312 0.101562 12.769531 C 0.164062 12.597656 0.261719 12.4375 0.386719 12.300781 L 7.742188 3.941406 C 7.90625 3.753906 8.105469 3.609375 8.328125 3.507812 C 8.554688 3.40625 8.796875 3.351562 9.042969 3.351562 Z M 9.042969 3.351562 "
                        />
                      ) : (
                        <path
                          fill="#007CC1"
                          d="M 11.050781 4.097656 C 11.351562 4.097656 11.648438 4.160156 11.921875 4.285156 C 12.195312 4.40625 12.4375 4.585938 12.636719 4.8125 L 21.628906 15.035156 C 21.914062 15.375 22.054688 15.808594 22.023438 16.25 C 21.988281 16.691406 21.785156 17.101562 21.453125 17.394531 C 21.121094 17.6875 20.6875 17.835938 20.246094 17.8125 C 19.804688 17.789062 19.386719 17.59375 19.089844 17.269531 L 11.222656 8.332031 C 11.203125 8.304688 11.175781 8.285156 11.148438 8.273438 C 11.117188 8.257812 11.085938 8.253906 11.050781 8.253906 C 11.019531 8.253906 10.988281 8.257812 10.957031 8.273438 C 10.925781 8.285156 10.902344 8.304688 10.878906 8.332031 L 3.015625 17.269531 C 2.871094 17.441406 2.691406 17.585938 2.492188 17.6875 C 2.289062 17.792969 2.070312 17.851562 1.847656 17.871094 C 1.621094 17.886719 1.394531 17.859375 1.179688 17.789062 C 0.96875 17.714844 0.769531 17.601562 0.601562 17.453125 C 0.429688 17.304688 0.292969 17.121094 0.195312 16.917969 C 0.0976562 16.714844 0.0390625 16.496094 0.0273438 16.269531 C 0.015625 16.046875 0.0507812 15.820312 0.125 15.609375 C 0.203125 15.394531 0.320312 15.199219 0.472656 15.035156 L 9.464844 4.816406 C 9.664062 4.589844 9.90625 4.410156 10.179688 4.285156 C 10.453125 4.160156 10.75 4.097656 11.050781 4.097656 Z M 11.050781 4.097656 "
                        />
                      )}
                    </svg>
                  ) : (
                    <svg
                      width={isMobileView() ? "18px" : "22px"}
                      height={isMobileView() ? "18px" : "22px"}
                      fontSize={isMobileView() ? "18px" : "22px"}
                      viewBox={isMobileView() ? "0 0 18 18" : "0 0 22 22"}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {isMobileView() ? (
                        <path
                          fill="#007CC1"
                          d="M 9 14.625 C 8.753906 14.625 8.511719 14.574219 8.289062 14.472656 C 8.066406 14.371094 7.867188 14.222656 7.703125 14.039062 L 0.34375 5.675781 C 0.113281 5.398438 -0.00390625 5.042969 0.0234375 4.679688 C 0.0507812 4.320312 0.21875 3.984375 0.492188 3.746094 C 0.761719 3.507812 1.117188 3.382812 1.480469 3.402344 C 1.839844 3.421875 2.179688 3.582031 2.425781 3.847656 L 8.859375 11.160156 C 8.875 11.179688 8.898438 11.195312 8.921875 11.207031 C 8.945312 11.21875 8.972656 11.226562 9 11.226562 C 9.027344 11.226562 9.054688 11.21875 9.078125 11.207031 C 9.101562 11.195312 9.125 11.179688 9.140625 11.160156 L 15.574219 3.847656 C 15.695312 3.707031 15.839844 3.589844 16.003906 3.503906 C 16.167969 3.421875 16.347656 3.371094 16.53125 3.355469 C 16.714844 3.34375 16.902344 3.363281 17.074219 3.421875 C 17.25 3.480469 17.414062 3.574219 17.550781 3.695312 C 17.691406 3.820312 17.804688 3.96875 17.882812 4.132812 C 17.964844 4.300781 18.011719 4.480469 18.019531 4.664062 C 18.03125 4.847656 18.003906 5.035156 17.941406 5.207031 C 17.875 5.378906 17.78125 5.539062 17.65625 5.675781 L 10.300781 14.035156 C 10.136719 14.222656 9.9375 14.371094 9.710938 14.472656 C 9.488281 14.570312 9.246094 14.625 9 14.625 Z M 9 14.625 "
                        />
                      ) : (
                        <path
                          fill="#007CC1"
                          d="M 11 17.875 C 10.699219 17.875 10.402344 17.8125 10.128906 17.6875 C 9.855469 17.566406 9.613281 17.386719 9.414062 17.160156 L 0.421875 6.9375 C 0.136719 6.597656 -0.00390625 6.160156 0.03125 5.722656 C 0.0625 5.28125 0.269531 4.871094 0.601562 4.578125 C 0.933594 4.285156 1.367188 4.136719 1.808594 4.160156 C 2.25 4.179688 2.664062 4.375 2.964844 4.703125 L 10.828125 13.640625 C 10.847656 13.664062 10.875 13.683594 10.90625 13.699219 C 10.933594 13.710938 10.96875 13.71875 11 13.71875 C 11.03125 13.71875 11.066406 13.710938 11.09375 13.699219 C 11.125 13.683594 11.152344 13.664062 11.171875 13.640625 L 19.035156 4.703125 C 19.179688 4.527344 19.359375 4.386719 19.558594 4.285156 C 19.761719 4.179688 19.980469 4.117188 20.207031 4.101562 C 20.429688 4.085938 20.65625 4.113281 20.871094 4.183594 C 21.085938 4.257812 21.28125 4.371094 21.453125 4.519531 C 21.621094 4.667969 21.757812 4.847656 21.855469 5.050781 C 21.957031 5.253906 22.011719 5.476562 22.023438 5.703125 C 22.035156 5.925781 22.003906 6.152344 21.925781 6.363281 C 21.847656 6.578125 21.730469 6.769531 21.578125 6.9375 L 12.585938 17.15625 C 12.390625 17.382812 12.144531 17.5625 11.871094 17.6875 C 11.597656 17.808594 11.300781 17.875 11 17.875 Z M 11 17.875 "
                        />
                      )}
                    </svg>
                  )
                }
                aria-expanded={isExpand ? "true" : "false"}
                aria-describedby={uId}
                aria-controls={uId}
                ariaLabel="card button"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

const CardBody = memo(({ bodyContent }) => {
  return (
    <div data-testid="cardBody" className={cardStyles.body_wrap}>
      {bodyContent}
    </div>
  );
});

const CardFooter = memo(({ footerContent }) => {
  return (
    <div data-testid="cardFooter" className={cardStyles.body_wrap}>
      {footerContent}
    </div>
  );
});

export const Card = memo(
  ({
    header,
    footerContent,
    bodyContent,
    type,
    headerToolbar,
    badge,
    padding,
    width,
    uniqueId,
    currentExpandedCard,
    onExpandCard,
  }) => {
    const [showBody, setShowBody] = useState(false);
    const uId = Date.now();

    useEffect(() => {
      if (type !== CARD_TYPE.ACCORDION) {
        setShowBody(true);
      }
    }, [type]);

    const handleClick = () => {
      onExpandCard(uniqueId);
    };

    const isCardExpanded = () => {
      if (type === CARD_TYPE.ACCORDION) {
        return currentExpandedCard === uniqueId;
      } else {
        return true;
      }
    };

    return (
      <div
        className={`${cardStyles.card_wrap} ${width} ${
          isCardExpanded() && type === CARD_TYPE.ACCORDION
            ? cardStyles.card_expand
            : type !== CARD_TYPE.ACCORDION && cardStyles.h_auto + " " + padding
        }`}
        id={uId}
        data-testid="cardcomp"
      >
        <CardHeader
          badge={badge}
          title={header}
          showArrow={type === CARD_TYPE.ACCORDION}
          isExpand={isCardExpanded()}
          headerToolbar={headerToolbar}
          handleClick={handleClick}
          uId={uId}
        />
        {isCardExpanded() && (
          <div className={cardStyles.cardContainer} data-testid="checkcard">
            <div className={cardStyles.container}>
              <CardBody bodyContent={bodyContent} />
            </div>
            <div className={cardStyles.footer_container}>
              <CardFooter footerContent={footerContent} />
            </div>
          </div>
        )}
      </div>
    );
  }
);

Card.propTypes = {
  header: PropTypes.any,
  footerContent: PropTypes.any,
  bodyContent: PropTypes.any,
  type: PropTypes.string,
  headerToolbar: PropTypes.any,
  badge: PropTypes.any,
  uniqueId: PropTypes.any,
  currentExpandedCard: PropTypes.any,
  onExpandCard: PropTypes.any,
  padding: PropTypes.string,
  width: PropTypes.string,
};
