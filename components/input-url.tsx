"use client";

import React, { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const InputUrl = () => {
  const [extractedUrl, setExtractedUrl] = useState("");
  const [formattedName, setFormattedName] = useState("");
  const [status, setStatus] = useState("");
  const messageStr = (
    <div className="text-xs space-y-2 border p-4 rounded-md">
      <p className="italic">
        Bismillahirrahmanirrahim Assalamualaikum<br></br>Warahmatullahi
        Wabarakatuh
      </p>
      <p>
        Kepada Yth:{" "}
        <span className="font-bold">
          {formattedName ? formattedName : "empty"}
        </span>
      </p>
      <p>
        Tanpa mengurangi rasa hormat, perkenankan kami mengundang Kepada Yth
        Bapak/Ibu/Saudara/i untuk hadir dan memberikan do&apos;a restu pada
        acara pernikahan kami.
      </p>
      <p>
        Pernikahan kami akan dilangsungkan pada hari Sabtu, tanggal{" "}
        <span className="font-bold">18 Januari 2024</span>
      </p>
      <p>
        Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi:{" "}
        <span className="font-bold">
          {extractedUrl ? extractedUrl : "empty"}
        </span>
      </p>
      <p>
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
        Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu di acara
        pernikahan kami.
      </p>
      <p>Atas kehadiran dan doanya kami mengucapkan terima kasih.</p>
      <p className="italic">Wassalamualaikum Warahmatullahi Wabarakatuh</p>
      <p>
        Yang Berbahagia, <br></br>Mariska & Rangga
      </p>
    </div>
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // 1. Extract the URL using a regular expression
    const urlRegex = /https:\/\/[^\s]+/;
    const match = val.match(urlRegex);

    // 2. Get the URL (if found)
    if (match) {
      const url = match[0];

      // 3. Create a URL object and extract the 'to' query parameter
      const urlObj = new URL(url);
      const slug = urlObj.searchParams.get("to");

      // 4. Unschedule the slug by replacing hyphens with spaces
      const unslugged = slug ? slug.replace(/-/g, " ") : null;

      // 5. Capitalize the first letter of each word except 'and'
      if (unslugged) {
        const formatted = unslugged
          .split(" ") // Split the string into words
          .map((word) => {
            if (word.toLowerCase() === "and") {
              return word; // Keep "and" in lowercase
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize first letter of each word
          })
          .join(" "); // Join words back into a single string

        setExtractedUrl(url);
        setFormattedName(formatted);

        e.target.value = url;
      }

      //   console.log("Extracted URL:", url);
      //   console.log("Formatted value:", formatted); // Output: "Yuki and Family"
    }
  };

  const handleCopy = () => {
    const msg = `\_Bismillahirrahmanirrahim\_
\_Assalamualaikum Warahmatullahi Wabarakatuh\_
\nKepada Yth:
\*${formattedName}\*
\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Kepada Yth Bapak/Ibu/Saudara/i untuk hadir dan memberikan do'a restu pada acara pernikahan kami.
\nPernikahan kami akan dilangsungkan pada hari Sabtu, tanggal \*18 Januari 2024\*
Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi: 
\n${extractedUrl}
\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu di acara pernikahan kami.
\nAtas kehadiran dan doanya kami mengucapkan terima kasih.
\n\_Wassalamualaikum Warahmatullahi Wabarakatuh\_
\nYang Berbahagia,
Mariska & Rangga`;

    // Copy the URL to the clipboard
    navigator.clipboard
      .writeText(msg)
      .then(() => {
        setStatus("Message copied to clipboard!");
      })
      .catch((err) => {
        setStatus("Failed to copy the message.");
      });
  };

  return (
    <div className="w-[80%] flex flex-col gap-4">
      <div>
        <Label htmlFor="invitation" className="mb-2">
          Your Invitation
        </Label>
        <Textarea
          onChange={(e) => handleInput}
          id="invitation"
          placeholder="Paste your invitation here."
        />
        <p className="text-sm text-muted-foreground">
          Paste your original invitation, and i will convert to Bahasa for you.
        </p>
      </div>

      {!formattedName ? (
        <div className="flex flex-col gap-4">
          {messageStr}
          <Button disabled>No invitation parsed</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messageStr}
          <Button onClick={handleCopy}>
            {status ? "Copied" : "Copy to clipboard"}
          </Button>
        </div>
      )}
    </div>
  );
};
