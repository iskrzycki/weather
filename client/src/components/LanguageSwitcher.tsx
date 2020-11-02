import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import i18n from "../i18n";

const useStyles = makeStyles((theme) => ({
  img: {
    width: 30,
  },
}));

interface Language {
  code: string;
  icon: string;
  text: string;
}

const LanguageSwitcher = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);

  const availableLanguages = [
    {
      code: "pl",
      icon: `${process.env.PUBLIC_URL}/icons/pl-flag.png`,
      text: t("language.pl"),
    },
    {
      code: "en",
      icon: `${process.env.PUBLIC_URL}/icons/uk-flag.png`,
      text: t("language.en"),
    },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng, () => setLanguage(lng));
  };

  const renderLangIcon = (lang: Language) => {
    const button = (
      <IconButton key={lang.code}>
        <img className={classes.img} src={lang.icon} alt={lang.code} />
      </IconButton>
    );

    return (
      <MenuItem value={lang.code}>
        {button}
        {lang.text}
      </MenuItem>
    );
  };

  return (
    <FormControl>
      <InputLabel id="language-label">{t("language.title")}</InputLabel>
      <Select
        labelId="language-label"
        value={language}
        onChange={(e) => changeLanguage(e.target.value as string)}
      >
        {availableLanguages.map((lang) => renderLangIcon(lang))}
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
