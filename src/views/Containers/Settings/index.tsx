'use client';
import { FC, useState } from 'react';
import { useFetcher } from '@/hooks/fetching/useFetcher';
import { Button, Card, Nav } from 'react-bootstrap';
import { TbEdit } from 'react-icons/tb';
import useSWR from 'swr';
import { useSession } from '@/hooks/session';
import { ProfilesMaster } from '@/lib/global.types';
import ProfileForm from '@/components/modular/profiles/forms';
import { TbUserCircle } from 'react-icons/tb';

const ContainerSetting: FC = () => {
  // const session = useSession();
  // const profileURL = session ? `/api/v1/profiles?id=${session.user.id}` : null;

  // const { data, error, isLoading } = useSWR(profileURL, (url) =>
  //   fetch(url).then((res) => res.json())
  // );
  const [activeTab, setActiveTab] = useState<'Profile' | 'Accounts'>('Profile');

  const toggleTab = (tab: 'Profile' | 'Accounts') => {
    setActiveTab(tab); // Update active tab when a button is clicked
  };

  return (
    <main className="py-5 ps-5 pe-4 bg-light">
      <section className="container-fluid py-5 my-5 ps-5">
        <div className="d-lg-flex gap-5">
          <div className="col-lg-3 col-md-12 mb-5">
            <Card className="bg-body-secondary rounded-4 shadow-sm mb-5 p-3 pt-4 border-0">
              <div className="d-flex">
                <div className="overflow-hidden">
                  <img
                    src="/assets/images/Rectangle 180.png"
                    alt="Profile"
                    className="profile rounded-circle"
                  />
                </div>
                <div className="mt-3 mx-3">
                  <h5 className="font-light">Name</h5>
                  <h4>Joined since {''}</h4>
                </div>
              </div>
              <Button
                className={`mt-4 ${
                  activeTab === 'Profile'
                    ? 'bg-warning border-0'
                    : 'bg-light border-0'
                }`}
                onClick={() => toggleTab('Profile')}
              >
                <span className="justify-content-start">
                  <TbUserCircle className=" mx2" size={2-0} />
                  Profile
                </span>
              </Button>
              <Button
                className={`mt-4 ${
                  activeTab === 'Accounts'
                    ? 'bg-warning border-0'
                    : 'bg-light border-0'
                }`}
                onClick={() => toggleTab('Accounts')}
              >
                Accounts
              </Button>
            </Card>
          </div>

          <div className="col-lg-8 bg-body-secondary rounded-4 shadow-sm p-3 pt-4 border">
            {/* Conditionally render the content based on the active tab */}
            {activeTab === 'Profile' && <ProfileForm />}
            {activeTab === 'Accounts' && (
              <>
                <div className="">Loading.....</div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
export default ContainerSetting;
