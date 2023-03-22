import { render, screen } from "@testing-library/react";
import * as nextAuth from "next-auth/react";
import Layout from "../Layout";

describe("Layout", () => {
  test("Renders login button when user is not logged in", () => {
    jest
      .spyOn(nextAuth, "useSession")
      .mockReturnValueOnce({ status: "unauthenticated" } as any);

    render(<Layout></Layout>);

    screen.getByRole("button", { name: "Login" });
  });

  test("Renders admin panel and logout buttons when user is logged in", () => {
    jest
      .spyOn(nextAuth, "useSession")
      .mockReturnValueOnce({ status: "authenticated" } as any);

    render(<Layout></Layout>);

    screen.getByRole("link", { name: "Admin Panel" });
    screen.getByRole("button", { name: "Logout (Admin)" });
  });
});
