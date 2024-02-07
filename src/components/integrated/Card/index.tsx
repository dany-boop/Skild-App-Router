import React, { FC } from 'react';
import { Button, Card, Col, ProgressBar, Row } from 'react-bootstrap';
import { TbFileSearch } from 'react-icons/tb';

interface CardProps {
  date: string;
  projectName: string;
  progress: number;
  weeksLeft: number;
}

const CardComponents: FC<CardProps> = ({
  date,
  projectName,
  progress,
  weeksLeft,
}) => {
  let cardBackgroundColor = '#0089C4';
  let buttonColor = 'primary';

  if (weeksLeft > 4) {
    cardBackgroundColor = '#0089C4';
    buttonColor = 'primary';
  } else if (weeksLeft > 0) {
    cardBackgroundColor = '#FE9A00';
    buttonColor = 'warning';
  } else {
    cardBackgroundColor = '#862A1A';
    buttonColor = 'danger';
  }

  const backgroundColorWithOpacity = `${cardBackgroundColor}70`;
  const progressVariant = `bg-${cardBackgroundColor}`;
  return (
    <Card
      className="h-100 rounded-4 max-w-7xl  "
      style={{ borderColor: cardBackgroundColor, borderWidth: '2px' }}
    >
      <div className="d-flex flex-column justify-content-between h-100 ">
        <div className="mx-3">
          <div className="d-flex">
            <div className=" profile rounded-2 overflow-hidden mt-3">
              <img
                src="/assets/images/Rectangle 180.png"
                alt="Profile"
                className="profile object-fit-cover"
              />
            </div>
            <div className="text-end mt-5 ms-3">{date}</div>
          </div>
          <div>
            <Card.Title className="mt-5 ">{projectName}</Card.Title>
            <div className="mt-4">
              Progress
              <ProgressBar
                className="mt-1 pb-0"
                now={progress}
                label={`${progress}%`}
                variant={progressVariant}
              />
            </div>
          </div>
        </div>

        <div
          className="mt-3 rounded-bottom-3 px-3"
          style={{ backgroundColor: backgroundColorWithOpacity }}
        >
          <Row>
            <Col xs={6} md={4} className="py-3 ">
              <div className=" profile-sm rounded-circle mx-2 overflow-hidden border border-2 border-white ">
                <img
                  src="/assets/images/Rectangle 180.png"
                  alt="Profile"
                  className="profile-sm rounded-circle"
                />
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center mx-1 rounded-bottom">
            <Button
              style={{ background: cardBackgroundColor, border: 'none' }}
              className="mb-3"
            >
              {weeksLeft > 0 ? `${weeksLeft} Weeks left` : 'Overdue'}
            </Button>
            <TbFileSearch size={25} className="text-end mb-3" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardComponents;
