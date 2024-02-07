"use client";

// import { Button } from '@/components/core/Button';
import { useEffect, useState, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Link from "@/hooks/navigation/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { useRouter } from "@/hooks/navigation";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email must not be empty" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password must not be empty" }),
});

type Schema = z.infer<typeof schema>;

export default function Main() {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();

  const asPathname = pathname.includes("admin")
    ? "Add Admin"
    : pathname.includes("business")
    ? "as Contractor"
    : "as Tradesman";

  const {
    watch,
    trigger,
    formState: { errors, isValid },
    ...form
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      // roles: pathname.includes('admin')
      //   ? 'admin'
      //   : pathname.includes('business')
      //   ? 'contractor'
      //   : 'tradesperson',
    },
  });

  const submitDisabled = useMemo(
    () =>
      loading ||
      !!errors.email?.message ||
      !!errors.password?.message ||
      !(!!form.getValues().email && !!form.getValues().password),
    [errors, form, loading]
  );

  useEffect(() => {
    const subscription = watch(() => trigger());
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      await fetch("/api/v1/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.ok || res.redirected) {
            router.push("/dashboard");
          } else {
            toast.error("Login failed. Please check your email or password", {
              toastId: "login-error",
            });
          }
        })
        .catch((error) => console.log(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          if (isValid) {
            onSubmit(form.getValues());
          } else {
            toast.error("Form is not valid");
          }
          form.handleSubmit((values) => onSubmit(values));
        }}
      >
        <div className="d-flex flex-row mt-5 justify-content-center">
          <h2 className="text-primary font-weight-bold text-center mt-5 pt-5 text-uppercase">
            Login
          </h2>
        </div>
        <Form.Group className="mb-3 mt-3">
          <Form.Control
            isInvalid={!!errors.email?.message}
            className={`py-3`}
            placeholder="Email"
            {...form.register("email")}
          />
          {errors.email?.message && (
            <Form.Text as="small" className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <InputGroup>
            <Form.Control
              isInvalid={!!errors.password?.message}
              className={`py-3 border-end-0`}
              type={visible ? "text" : "password"}
              placeholder="Enter password"
              {...form.register("password")}
            />
            <Button
              className={`px-3 bg-white border border-start-0 ${
                errors.password?.message && "border-danger"
              }`}
              type="button"
              onClick={() => setVisible((o) => !o)}
            >
              {visible ? <BsEyeFill size={20} /> : <BsEyeSlashFill size={20} />}
            </Button>
          </InputGroup>
          {errors.password?.message && (
            <Form.Text as="small" className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>
        <div className="text-center">
          <Button
            type="submit"
            disabled={submitDisabled}
            className="btn btn-warning text-uppercase btn-lg py-3 w-100 "
          >
            {!loading ? (
              "Login"
            ) : (
              <Spinner
                as="span"
                animation="border"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
          <div className="text-bottom mt-5 pt-5">
            <p className=" fw-normal align-bottom mt-5">
              Create account?{" "}
              {pathname.includes("/trades") && (
                <Link href="/register/trades" className="link-primary">
                  Sign Up
                </Link>
              )}
              {pathname.includes("/business") && (
                <Link href="/register/business" className="link-primary">
                  Sign Up
                </Link>
              )}
            </p>
          </div>
        </div>
      </Form>
    </>
  );
}
