import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const data = contactSchema.parse(payload);
    await sendContactEmail(data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: false, message: "Unknown error" }, { status: 500 });
  }
}
