<?xml version="1.0" encoding="UTF-8"?>

<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Mon Mar 06 15:19:11 CET 2023 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html"/>
  <xsl:param name="country_code" select="toto"/>
	
  <xsl:template match="/">
		<HTML>
			<BODY bgcolor="#FFFFCC">
				<element_a_recuperer>
					<ul><!-- on cherche les références bibliographiques dont la balise contient la valeur du paramètre-->
						<xsl:apply-templates select="//countries/country[country_codes/cca2= $country_code]"/>
					</ul>
				</element_a_recuperer>
			</BODY>
		</HTML>
	</xsl:template>
  <xsl:template match="country">
		<li>
			<xsl:value-of select="./country_name/offic_name"/>, 
      <xsl:value-of select="./capital"/>
  	</li>
	</xsl:template>

</xsl:stylesheet>


