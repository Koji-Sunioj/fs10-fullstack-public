const mapOptions = (
  select: HTMLSelectElement,
  settter: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const selected = Array.from(select as HTMLSelectElement["options"])
    .filter((option) => {
      return option.selected;
    })
    .map((owner) => owner.value);

  settter(selected);
};

export default mapOptions;
