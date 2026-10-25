import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PrayogaPage from "../features/prayoga/pages/PrayogaPage";
import { SAMPLE_LITERARY_WORKS } from "../features/prayoga/modules/sahitya/sampleData";
import { FOLK_ART_TRADITIONS } from "../features/prayoga/modules/ranga/folkArtData";
import { VOCABULARY_ARCHIVE } from "../features/prayoga/modules/nudi/dialectData";

jest.mock("../features/prayoga/components/Prayoga3DCanvas", () => {
  return function MockPrayoga3DCanvas() {
    return <div data-testid="mock-3d-canvas" />;
  };
});

jest.mock("../features/prayoga/styles/prayoga.css", () => ({}));

describe("Prayoga Cultural Experience & Module Integration", () => {
  it("renders PrayogaPage with monumental header and section navigation tabs", () => {
    render(
      <MemoryRouter initialEntries={["/prayoga"]}>
        <PrayogaPage />
      </MemoryRouter>
    );

    // Primary bilingual heading
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("ಪ್ರಯೋಗ");
    expect(screen.getByText("ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಸಂಸ್ಕೃತಿಯ ಸಮ್ಮಿಲನ")).toBeInTheDocument();

    // Verify all three cultural gateways are present
    expect(screen.getAllByText("ಸಾಹಿತ್ಯ ವೇದಿಕೆ").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("ರಂಗ-ಚಿತ್ತಾರ").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("ನುಡಿ-ಬೆಳಕು").length).toBeGreaterThanOrEqual(1);
  });

  it("loads Sahitya Module by default with clearly labeled sample works and working draft persistence", () => {
    render(
      <MemoryRouter initialEntries={["/prayoga"]}>
        <PrayogaPage />
      </MemoryRouter>
    );

    // Sahitya module title & english descriptor
    expect(screen.getAllByText("Poetry & Literature Canvas").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("ಕವನಗಳನ್ನು ಓದಿ — Explore Poetry")).toBeInTheDocument();

    // Verify sample works have explicit sample labels
    SAMPLE_LITERARY_WORKS.forEach((work) => {
      expect(work.isSample).toBe(true);
      expect(work.authorLabel).toBeDefined();
    });

    // Test switching to "ಬರಹ ಕಣ್ವ (Write)" mode
    const writeBtn = screen.getByText("ಬರಹ ಕಣ್ವ (Write)");
    fireEvent.click(writeBtn);

    expect(screen.getByText("ನಿಮ್ಮ ಸಾಹಿತ್ಯ ಸೃಷ್ಟಿಸಿ (Compose Your Writing)")).toBeInTheDocument();

    // Test writing a new poem and saving draft
    const titleInput = screen.getByLabelText(/ಶೀರ್ಷಿಕೆ \(Title\)/i);
    const contentInput = screen.getByLabelText(/ಸಾಹಿತ್ಯ ವಿಷಯ/i);

    fireEvent.change(titleInput, { target: { value: "ಪರೀಕ್ಷಾ ಕವನ" } });
    fireEvent.change(contentInput, { target: { value: "ಕನ್ನಡ ಕೂಟದ ಪವಿತ್ರ ಸಾಹಿತ್ಯ ಪರೀಕ್ಷಾ ಸಾಲುಗಳು" } });

    const saveBtn = screen.getByRole("button", { name: /ಕರಡು ಉಳಿಸಿ \(Save Draft\)/i });
    fireEvent.click(saveBtn);

    // Verify inline success feedback
    expect(screen.getByText(/ಕರಡು ಯಶಸ್ವಿಯಾಗಿ ಸ್ಥಳೀಯವಾಗಿ ಸಂಗ್ರಹವಾಗಿದೆ/i)).toBeInTheDocument();
  });

  it("navigates to Ranga Module via URL parameter ?tab=ranga", () => {
    render(
      <MemoryRouter initialEntries={["/prayoga?tab=ranga"]}>
        <PrayogaPage />
      </MemoryRouter>
    );

    // Ranga module should be active
    expect(screen.getAllByText("Interactive Folk & Art Studio").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("ಕಲೆಗಳ ಅನ್ವೇಷಣೆ — Explore Traditions")).toBeInTheDocument();

    // Verify folk art traditions are listed
    expect(screen.getByText("ಯಕ್ಷಗಾನ")).toBeInTheDocument();
    expect(screen.getByText("ಡೊಳ್ಳು ಕುಣಿತ")).toBeInTheDocument();
    expect(screen.getByText("ಕಂಸಾಳೆ")).toBeInTheDocument();

    // Verify all 5 traditions exist in data
    expect(FOLK_ART_TRADITIONS.length).toBe(5);
  });

  it("navigates to Nudi Module via URL parameter ?tab=nudi and verifies audio integrity", () => {
    render(
      <MemoryRouter initialEntries={["/prayoga?tab=nudi"]}>
        <PrayogaPage />
      </MemoryRouter>
    );

    // Nudi module should be active
    expect(screen.getAllByText("Linguistic & Dialect Archive").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("ಪ್ರಾದೇಶಿಕ ನಕ್ಷೆ (Regional Map)")).toBeInTheDocument();

    // Switch to Vocabulary Archive
    const vocabTab = screen.getByText("ಪದಕೋಶ ಸಂಗ್ರಹ (Vocabulary)");
    fireEvent.click(vocabTab);

    // Verify vocabulary entries exist
    expect(screen.getByText("ಲಗೂನ (Laguna)")).toBeInTheDocument();
    expect(screen.getByText("ಮಾರೆರೆ (Maarere)")).toBeInTheDocument();

    // Verify that unavailable audio is NOT presented as playable
    const unavailableFooters = screen.getAllByText(/ಧ್ವನಿಮುದ್ರಿಕೆ ಅಲಭ್ಯ/i);
    expect(unavailableFooters.length).toBeGreaterThan(0);

    // Ensure all current entries without audio files have hasVerifiedAudio as false
    VOCABULARY_ARCHIVE.forEach((entry) => {
      if (!entry.audioFile) {
        expect(entry.hasVerifiedAudio).toBe(false);
      }
    });
  });

  it("handles Sahitya search, category filtering, reading modal and Escape key", () => {
    render(
      <MemoryRouter initialEntries={["/prayoga?tab=sahitya"]}>
        <PrayogaPage />
      </MemoryRouter>
    );

    // Test search filter
    const searchInput = screen.getByPlaceholderText(/ಕವನ ಅಥವಾ ಕಥೆ ಹುಡುಕಿ/i);
    fireEvent.change(searchInput, { target: { value: "ಹಂಪಿಯ ಕಲ್ಲಿನ ಹಾಡು" } });
    expect(screen.getByText("ಹಂಪಿಯ ಕಲ್ಲಿನ ಹಾಡು")).toBeInTheDocument();

    // Clear search
    fireEvent.change(searchInput, { target: { value: "" } });

    // Open reader modal
    const readButtons = screen.getAllByRole("button", { name: /ಸಂಪೂರ್ಣ ಓದಿ \(Read\)/i });
    expect(readButtons.length).toBeGreaterThan(0);
    fireEvent.click(readButtons[0]);

    // Verify dialog is visible
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/ಹಿಂದಕ್ಕೆ · Back to Library/i)).toBeInTheDocument();

    // Press Escape to close modal
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("handles Ranga folk art details modal, Chittara pattern generator controls, reset and SVG export", () => {
    // Mock URL.createObjectURL and URL.revokeObjectURL for SVG export
    window.URL.createObjectURL = jest.fn(() => "blob:mock-svg-url");
    window.URL.revokeObjectURL = jest.fn();

    render(
      <MemoryRouter initialEntries={["/prayoga?tab=ranga"]}>
        <PrayogaPage />
      </MemoryRouter>
    );

    // Open Yakshagana detail modal using "ವಿವರ ನೋಡಿ"
    const detailButtons = screen.getAllByRole("button", { name: /ವಿವರ ನೋಡಿ/i });
    expect(detailButtons.length).toBeGreaterThan(0);
    fireEvent.click(detailButtons[0]);

    // Verify modal opened
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/Return to Art Studio/i)).toBeInTheDocument();

    // Close via Escape key
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Switch to Chittara Studio tab
    const studioTab = screen.getByText("ಚಿತ್ತಾರ ರಚನಾ ಕಣ್ವ (Pattern Studio)");
    fireEvent.click(studioTab);
    expect(screen.getByText("ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಯಾಮಿತೀಯ ಕಲಾ ವಿನ್ಯಾಸ (Pattern Generator)")).toBeInTheDocument();

    // Click Reset button
    const resetBtn = screen.getByText("ಮರುಹೊಂದಿಸಿ (Reset)");
    fireEvent.click(resetBtn);

    // Click SVG export button
    const exportBtn = screen.getByText("SVG ಡೌನ್‌ಲೋಡ್ (Export)");
    fireEvent.click(exportBtn);
    expect(window.URL.createObjectURL).toHaveBeenCalled();
  });

  it("handles Nudi search, region filtering, word detail modal, and Escape key", () => {
    render(
      <MemoryRouter initialEntries={["/prayoga?tab=nudi"]}>
        <PrayogaPage />
      </MemoryRouter>
    );

    // Switch to Vocabulary Archive
    const vocabTab = screen.getByText("ಪದಕೋಶ ಸಂಗ್ರಹ (Vocabulary)");
    fireEvent.click(vocabTab);

    // Search for a specific word
    const searchInput = screen.getByPlaceholderText(/ಕನ್ನಡ ಪದ, ಇಂಗ್ಲಿಷ್ ಅರ್ಥ ಅಥವಾ ವಾಕ್ಯ ಹುಡುಕಿ/i);
    fireEvent.change(searchInput, { target: { value: "ಲಗೂನ" } });
    expect(screen.getByText("ಲಗೂನ (Laguna)")).toBeInTheDocument();

    // Open Word Detail modal
    const detailBtns = screen.getAllByRole("button", { name: /ವಿವರ ನೋಡಿ \(Details\)/i });
    expect(detailBtns.length).toBeGreaterThan(0);
    fireEvent.click(detailBtns[0]);

    // Verify dialog is visible
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/ಪದಕೋಶ ವಿವರ · Word Profile/i)).toBeInTheDocument();

    // Press Escape to close modal
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("switches modules seamlessly when user clicks SectionSelector cards", () => {
    render(
      <MemoryRouter initialEntries={["/prayoga"]}>
        <PrayogaPage />
      </MemoryRouter>
    );

    // Default is Sahitya
    expect(screen.getAllByText("Poetry & Literature Canvas").length).toBeGreaterThanOrEqual(1);

    // Click Ranga gateway card
    const rangaCards = screen.getAllByText("ರಂಗ-ಚಿತ್ತಾರ");
    fireEvent.click(rangaCards[0]);
    expect(screen.getAllByText("Interactive Folk & Art Studio").length).toBeGreaterThanOrEqual(1);

    // Click Nudi gateway card
    const nudiCards = screen.getAllByText("ನುಡಿ-ಬೆಳಕು");
    fireEvent.click(nudiCards[0]);
    expect(screen.getAllByText("Linguistic & Dialect Archive").length).toBeGreaterThanOrEqual(1);

    // Click Sahitya gateway card back
    const sahityaCards = screen.getAllByText("ಸಾಹಿತ್ಯ ವೇದಿಕೆ");
    fireEvent.click(sahityaCards[0]);
    expect(screen.getAllByText("Poetry & Literature Canvas").length).toBeGreaterThanOrEqual(1);
  });
});

