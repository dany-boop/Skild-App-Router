import React, { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useFetcher } from '@/hooks/fetching/useFetcher';

import SearchComponent from '@/components/modular/search/forms';
import ProfileCard from '@/components/integrated/TradesCard';
import { ProfilesMaster, TradesSkillsMaster } from '@/lib/global.types';
import { Button, Card } from 'react-bootstrap';
import { TbMessageDots, TbUserCircle } from 'react-icons/tb';

type ContainerSearchContractorProps = {
  onMounted: () => void;
};

const ContainerSearchContractor: FC<ContainerSearchContractorProps> = ({
  onMounted,
  ...rest
}) => {
  const {
    data: tradesData,
    error: tradesError,
    isLoading: tradesLoading,
  } = useSWR('/api/v1/trades/profiles', useFetcher);

  const {
    data: skillsData,
    error: skillsError,
    isLoading: skillsLoading,
  } = useSWR('/api/v1/trades/tradeskills', useFetcher);

  const [filteredTrades, setFilteredData] = useState<ProfilesMaster[]>([]);

  const handleSearch = (query: string) => {
    const filteredTrades = tradesData?.data?.filter((jobs: ProfilesMaster) => {
      console.log(jobs.name);
      return jobs.name?.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredData(filteredTrades || []);
  };
  // useEffect(() => onMounted());
  return (
    <main className="py-5 my-5 ps-5 ">
      <section className="py-5 ps-3  bg-body-light me-lg-0 me-sm-4 ">
        <SearchComponent onSubmit={handleSearch} roles="contractor" />

        <div className="py-2 px-3 mt-3 rounded-4 bg-white">
          <div className="row row-cols-1 row-cols-md-3 gap-4 my-4">
            {tradesLoading ? (
              <>
                {[1, 2, 3, 4].map((skeletonIndex) => (
                  <Card
                    key={skeletonIndex}
                    style={{ width: '20rem' }}
                    className="relative overflow-hidden mb-sm-5 mb-lg-0 border border-3 border-primary shadow shadow-primary px-3 placeholder-glow"
                  >
                    <div className="mx-auto mt-4 bg-primary rounded-circle profile-lg d-flex justify-content-center align-items-center">
                      {/* You can replace this with your custom skeleton content */}
                    </div>
                    <div aria-hidden="true" className="mt-3">
                      <div className="text-center mb-0 card-title placeholder w-100 py-4 bg-light " />
                      <div className="text-primary font-light text-center w-100 py-2  mt-4  card-title bg-primary placeholder " />
                      <div className="d-flex text-center my-4 w-50 justify-content-center px-2 py-3 bg-info placeholder">
                        {/* Add more skeleton placeholders here */}
                      </div>

                      <div className="d-flex gap-3">
                        <Button
                          variant="primary"
                          className="text-white d-flex mt-3 mb-3 shadow-sm disabled placeholder"
                        ></Button>
                        <Button
                          variant="secondary"
                          className="text-white d-flex mt-3 mb-3 shadow-sm disabled placeholder"
                        ></Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            ) : (
              filteredTrades.map((profile: ProfilesMaster) => (
                <Card
                  key={profile.id}
                  style={{ width: '20rem' }}
                  className="relative overflow-hidden mb-sm-5 mb-lg-0 border border-3 border-primary shadow shadow-primary px-3 "
                >
                  <div className="mx-auto mt-4 bg-primary rounded-circle profile-lg d-flex justify-content-center align-items-center">
                    {profile.avatar ? (
                      <Card.Img
                        className="profile rounded-circle"
                        src={profile.avatar}
                      />
                    ) : (
                      <div className="text-white">
                        <TbUserCircle size={90} />
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <h2 className="text-center mb-0">
                      {profile.name || 'Name Not Available'}
                    </h2>
                    <h5 className="text-primary font-light text-center mt-0">
                      {profile.roles?.name || 'Member'}
                    </h5>
                    <div className="d-flex justify-content-center my-4">
                      {skillsData?.data?.map(
                        (skillsData: TradesSkillsMaster) => (
                          <span
                            key={skillsData?.id}
                            className="text-primary bg-info rounded-4 px-2 py-1 me-2"
                          >
                            {skillsData.skills.name}
                          </span>
                        )
                      )}
                    </div>

                    <div className="d-flex gap-3">
                      <Button
                        variant="primary"
                        className="text-white d-flex mt-3 mb-3 shadow-sm"
                      >
                        <TbUserCircle size={35} className="mx-2" />
                        <p className="ms-2 mt-2 mb-1">Profile</p>
                      </Button>
                      <Button
                        variant="secondary"
                        className="text-white d-flex mt-3 mb-3 shadow-sm"
                      >
                        <TbMessageDots size={35} className="mx-2" />
                        <p className="ms-2 mt-2 mb-1">Chat</p>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContainerSearchContractor;
